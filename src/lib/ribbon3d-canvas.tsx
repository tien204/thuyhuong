"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/lib/motion";

function cssVar(name: string, fallback = ""): string {
  if (typeof window === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return value || fallback;
}

const RIBBON_W = 0.4;
const WHITE_RIBBON_W = 0.42;
const CAMERA_Z = 5.0;
const LETTER_SPACING = "0.3em";
const BASE_FONT_SIZE = 64;
const TEX_HEIGHT = 148;
const BASE_FONT_STROKE = 3;
const TEX_SCALE = 2;

const RIBBON_FONT_FALLBACK = '"Arial Black", "Segoe UI Black", sans-serif';

function ribbonFont(): string {
  const family = cssVar("--font-ribbon", RIBBON_FONT_FALLBACK);
  return `900 ${BASE_FONT_SIZE}px ${family}`;
}

const CYL = { x: 2.2, z: 0, R: 1.38 };
const GROUP_Y_OFFSET = -0.4;
const CYL_TILT_Z = -0.18;
const HELIX = { theta0: Math.PI, y0: 1.12, pitch: -1.05 };
const EXTEND_LEN_START = 15.5;
const EXTEND_LEN_END = 15.5;
const EXTEND_STEPS = 64;
const END_Y_SCALE = 0.72;
const PARALLEL_BLEND_FRAC = 0.5;

interface RibbonSceneOptions {
  ribbonText: string;
  align?: "left" | "center" | "right";
}

interface RibbonTextureAnim {
  texture: THREE.Texture;
  direction: 1 | -1;
  duration: number;
}

interface RibbonSceneHandle {
  textures: RibbonTextureAnim[];
  setRendering: (active: boolean) => void;
  dispose: () => void;
}

function measureTexUnitLen(unit: string): number {
  const ctx = document.createElement("canvas").getContext("2d")!;
  applyRibbonTextStyle(ctx);
  return ctx.measureText(unit).width / 100;
}

function applyRibbonTextStyle(ctx: CanvasRenderingContext2D) {
  ctx.font = ribbonFont();
  (ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing =
    LETTER_SPACING;
  ctx.textBaseline = "middle";
  ctx.lineJoin = "round";
  ctx.lineWidth = BASE_FONT_STROKE;
}

function drawRibbonText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
) {
  applyRibbonTextStyle(ctx);
  const color = ctx.fillStyle as string;
  ctx.strokeStyle = color;
  ctx.strokeText(text, x, y);
  ctx.fillText(text, x, y);
}

function onCyl(theta: number, y: number, r = CYL.R): THREE.Vector3 {
  return new THREE.Vector3(
    CYL.x + r * Math.sin(theta),
    y,
    CYL.z + r * Math.cos(theta),
  );
}

function buildHelixPath(): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  const n = 360;
  for (let i = 0; i <= n; i++) {
    const f = i / n;
    pts.push(onCyl(HELIX.theta0 + f * Math.PI * 2, HELIX.y0 + HELIX.pitch * f));
  }
  return pts;
}

function pathTangent(pts: THREE.Vector3[], i: number): THREE.Vector3 {
  if (i <= 0) return pts[1].clone().sub(pts[0]).normalize();
  if (i >= pts.length - 1)
    return pts[i].clone().sub(pts[i - 1]).normalize();
  return pts[i + 1].clone().sub(pts[i - 1]).normalize();
}

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

function smoothExtendLeg(
  origin: THREE.Vector3,
  helixTangent: THREE.Vector3,
  len: number,
  steps: number,
  awayFromHelix: boolean,
  forceScreenParallel = false,
): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [origin.clone()];
  let p = origin.clone();
  const ds = len / steps;

  if (forceScreenParallel) {
    const sign = awayFromHelix ? -1 : 1;
    const parallelDir = new THREE.Vector3(sign, 0, 0);
    const t0 = helixTangent.clone().normalize();

    for (let i = 1; i <= steps; i++) {
      const f = i / steps;
      const blend = smoothstep(Math.min(f / PARALLEL_BLEND_FRAC, 1));
      const dir = new THREE.Vector3()
        .lerpVectors(t0, parallelDir, blend)
        .normalize();

      p = p.clone().add(dir.multiplyScalar(ds));
      p.y = THREE.MathUtils.lerp(p.y, origin.y, blend);
      p.z = THREE.MathUtils.lerp(p.z, origin.z, blend);
      pts.push(p);
    }

    return awayFromHelix ? pts : pts.reverse();
  }

  const t0 = helixTangent.clone().normalize();
  const sign = awayFromHelix ? 1 : -1;

  for (let i = 1; i <= steps; i++) {
    const f = i / steps;
    const yMul = 1 + (END_Y_SCALE - 1) * smoothstep(f);
    const dir = new THREE.Vector3(t0.x, t0.y * yMul, t0.z)
      .normalize()
      .multiplyScalar(sign);
    p = p.clone().add(dir.multiplyScalar(ds));
    pts.push(p);
  }

  return awayFromHelix ? pts : pts.reverse();
}

function joinPaths(...parts: THREE.Vector3[][]): THREE.Vector3[] {
  const out: THREE.Vector3[] = [];
  parts.forEach((p, i) => out.push(...(i === 0 ? p : p.slice(1))));
  return out;
}

function buildFullPath(): THREE.Vector3[] {
  const helix = buildHelixPath();
  const tanStart = pathTangent(helix, 0);
  const tanEnd = pathTangent(helix, helix.length - 1);

  const startLeg = smoothExtendLeg(
    helix[0],
    tanStart,
    EXTEND_LEN_START,
    EXTEND_STEPS,
    false,
    false,
  );
  const endLeg = smoothExtendLeg(
    helix[helix.length - 1],
    tanEnd,
    EXTEND_LEN_END,
    EXTEND_STEPS,
    true,
    false,
  );

  return joinPaths(startLeg, helix, endLeg);
}

function resampleUniform(points: THREE.Vector3[], count: number): THREE.Vector3[] {
  if (points.length < 2) return points;

  const lens: number[] = [0];
  for (let i = 1; i < points.length; i++) {
    lens.push(lens[i - 1] + points[i].distanceTo(points[i - 1]));
  }
  const total = lens[lens.length - 1];
  const out: THREE.Vector3[] = [];

  for (let i = 0; i <= count; i++) {
    const target = (i / count) * total;
    let j = 1;
    while (j < lens.length - 1 && lens[j] < target) j++;
    const segLen = lens[j] - lens[j - 1];
    const t = segLen > 1e-8 ? (target - lens[j - 1]) / segLen : 0;
    out.push(points[j - 1].clone().lerp(points[j], t));
  }
  return out;
}

function outerNormal(p: THREE.Vector3): THREE.Vector3 {
  const r = new THREE.Vector3(p.x - CYL.x, 0, p.z - CYL.z);
  if (r.lengthSq() < 1e-6) r.set(0, 0, 1);
  return r.normalize();
}

function ribbonFrame(p: THREE.Vector3, tangent: THREE.Vector3) {
  const t = tangent.clone().normalize();
  const screenUp = new THREE.Vector3(0, 1, 0);
  let widthDir = screenUp.clone().sub(t.clone().multiplyScalar(screenUp.dot(t)));
  if (widthDir.lengthSq() < 1e-8) {
    widthDir = new THREE.Vector3().crossVectors(new THREE.Vector3(1, 0, 0), t);
  }
  widthDir.normalize();
  if (widthDir.y < 0) widthDir.negate();

  const normal = new THREE.Vector3().crossVectors(t, widthDir).normalize();
  const radial = outerNormal(p);
  if (normal.dot(radial) < 0) normal.negate();

  return { normal, widthDir };
}

function ribbonFaceGeo(
  points: THREE.Vector3[],
  width: number,
  segs: number,
  sign: 1 | -1,
  unitLen: number,
): THREE.BufferGeometry {
  const path = resampleUniform(points, segs);
  const half = width / 2;
  const pos: number[] = [];
  const uv: number[] = [];
  const nrm: number[] = [];
  const idx: number[] = [];
  let uLen = 0;

  for (let i = 0; i < path.length; i++) {
    const p = path[i];
    const prev = i > 0 ? path[i - 1] : p;
    const next = i < path.length - 1 ? path[i + 1] : p;
    const tangent = next.clone().sub(prev);
    if (tangent.lengthSq() < 1e-8) tangent.set(1, 0, 0);
    tangent.normalize();

    if (i > 0) uLen += p.distanceTo(path[i - 1]);

    const { normal, widthDir } = ribbonFrame(p, tangent);
    const face = normal.clone().multiplyScalar(sign);
    const a = p.clone().addScaledVector(widthDir, -half);
    const b = p.clone().addScaledVector(widthDir, half);

    pos.push(a.x, a.y, a.z, b.x, b.y, b.z);

    const u = uLen / unitLen;
    uv.push(u, 0, u, 1);

    nrm.push(face.x, face.y, face.z, face.x, face.y, face.z);

    if (i < path.length - 1) {
      const base = i * 2;
      if (sign === 1) {
        idx.push(base, base + 1, base + 2, base + 1, base + 3, base + 2);
      } else {
        idx.push(base, base + 2, base + 1, base + 1, base + 2, base + 3);
      }
    }
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pos), 3));
  g.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(uv), 2));
  g.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(nrm), 3));
  g.setIndex(idx);
  return g;
}

function unifiedRibbonGeo(
  points: THREE.Vector3[],
  blueWidth: number,
  whiteWidth: number,
  unitLen: number,
): THREE.BufferGeometry {
  const segs = 580;

  const outer = ribbonFaceGeo(points, blueWidth, segs, 1, unitLen);
  const inner = ribbonFaceGeo(points, whiteWidth, segs, -1, unitLen);
  const merged = mergeGeometries([outer, inner], false)!;
  outer.dispose();
  inner.dispose();

  merged.addGroup(0, segs * 6, 0);
  merged.addGroup(segs * 6, segs * 6, 1);
  merged.computeBoundingSphere();
  return merged;
}

function textTexture(
  bg: string,
  fg: string,
  unit: string,
  flipH = false,
): THREE.CanvasTexture {
  const m = document.createElement("canvas").getContext("2d")!;
  applyRibbonTextStyle(m);
  const uw = m.measureText(unit).width;

  const reps = 8;
  const logicalW = uw * reps;
  const c = document.createElement("canvas");
  c.width = Math.ceil(logicalW * TEX_SCALE);
  c.height = TEX_HEIGHT * TEX_SCALE;
  const ctx = c.getContext("2d")!;
  ctx.scale(TEX_SCALE, TEX_SCALE);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, logicalW, TEX_HEIGHT);
  ctx.fillStyle = fg;
  for (let i = 0; i < reps; i++)
    drawRibbonText(ctx, unit, i * uw, TEX_HEIGHT / 2);

  let source: HTMLCanvasElement = c;
  if (flipH) {
    const flipped = document.createElement("canvas");
    flipped.width = c.width;
    flipped.height = c.height;
    const fx = flipped.getContext("2d")!;
    fx.translate(c.width, 0);
    fx.scale(-1, 1);
    fx.drawImage(c, 0, 0);
    source = flipped;
  }

  const tex = new THREE.CanvasTexture(source);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.generateMipmaps = true;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  return tex;
}

function createCylinderMesh(): THREE.Mesh {
  const yMin = HELIX.y0 + HELIX.pitch;
  const yMax = HELIX.y0;
  const height = Math.abs(HELIX.pitch) + RIBBON_W * 1.6;
  const centerY = (yMin + yMax) / 2;

  const geo = new THREE.CylinderGeometry(CYL.R, CYL.R, height, 96, 1, false);
  const mat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(cssVar("--color-ribbon-cylinder")),
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(CYL.x, centerY, CYL.z);
  mesh.renderOrder = 0;
  return mesh;
}

function padRibbonUnit(text: string): string {
  const padded = `${text}         `;
  return padded.length >= 10 ? padded : padded.padEnd(10, " ");
}

const RIBBON_SCROLL_BASE_DURATION = 7;
const RIBBON_SPEED_REFERENCE_TEXT = "Titan Agency";

/** Chuẩn hóa tốc độ cuộn theo độ dài chữ — dải 01 làm mốc */
function getRibbonScrollDuration(ribbonText: string): number {
  const referenceLen = measureTexUnitLen(
    padRibbonUnit(RIBBON_SPEED_REFERENCE_TEXT),
  );
  const unitLen = measureTexUnitLen(padRibbonUnit(ribbonText));

  if (referenceLen <= 0) return RIBBON_SCROLL_BASE_DURATION;

  return RIBBON_SCROLL_BASE_DURATION * (unitLen / referenceLen);
}

function createRibbonScene(
  container: HTMLElement,
  options: RibbonSceneOptions,
): RibbonSceneHandle {
  const accent = cssVar("--color-ribbon-accent");
  const band = cssVar("--color-ribbon-band");
  const onAccent = cssVar("--color-ribbon-on-accent");
  const onBand = cssVar("--color-ribbon-on-band");
  const backgroundColor = cssVar("--color-ribbon-bg");
  const unit = padRibbonUnit(options.ribbonText);
  const unitLen = measureTexUnitLen(unit);

  const w = container.clientWidth;
  const h = container.clientHeight;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(backgroundColor);

  const ORTHO_VIEW_H = 2.4;
  const aspect = w / h;

  const camera = new THREE.OrthographicCamera(
    (-ORTHO_VIEW_H * aspect) / 2,
    (ORTHO_VIEW_H * aspect) / 2,
    ORTHO_VIEW_H / 2,
    -ORTHO_VIEW_H / 2,
    0.1,
    100,
  );

  const align = options.align ?? "right";

  if (align === "right") {
    const VIEW_X = 1.55;

    camera.position.set(VIEW_X, 0.15, CAMERA_Z);
    camera.lookAt(VIEW_X, 0.1, 0);
  } else if (align === "left") {
    camera.position.set(2.0, 0.15, CAMERA_Z);
    camera.lookAt(1.2, 0.1, 0);
  } else {
    camera.position.set(0.3, 0.15, CAMERA_Z);
    camera.lookAt(0.5, 0.1, 0);
  }

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

  const pivotY = HELIX.y0 + HELIX.pitch / 2;
  const pivot = new THREE.Vector3(CYL.x, pivotY, CYL.z);
  const ribbonGroup = new THREE.Group();
  ribbonGroup.position.set(pivot.x, pivot.y + GROUP_Y_OFFSET, pivot.z);
  ribbonGroup.rotation.z = CYL_TILT_Z;
  scene.add(ribbonGroup);

  const cylinder = createCylinderMesh();
  cylinder.position.sub(pivot);
  ribbonGroup.add(cylinder);

  const path = buildFullPath();
  const geo = unifiedRibbonGeo(path, RIBBON_W, WHITE_RIBBON_W, unitLen);
  geo.translate(-pivot.x, -pivot.y, -pivot.z);

  const mapOuter = textTexture(band, onBand, unit);
  const mapInner = textTexture(accent, onAccent, unit, true);
  mapOuter.anisotropy = maxAnisotropy;
  mapInner.anisotropy = maxAnisotropy;

  const scrollDuration = getRibbonScrollDuration(options.ribbonText);

  const textures: RibbonTextureAnim[] = [
    { texture: mapInner, direction: -1, duration: scrollDuration },
    { texture: mapOuter, direction: 1, duration: scrollDuration },
  ];

  const ribbon = new THREE.Mesh(geo, [
    new THREE.MeshBasicMaterial({ map: mapInner, side: THREE.FrontSide }),
    new THREE.MeshBasicMaterial({ map: mapOuter, side: THREE.FrontSide }),
  ]);
  ribbon.renderOrder = 1;
  ribbonGroup.add(ribbon);

  const disposables: THREE.Object3D[] = [ribbonGroup];

  let frameId = 0;
  let rendering = true;

  const render = () => {
    frameId = requestAnimationFrame(render);
    if (rendering) {
      renderer.render(scene, camera);
    }
  };
  render();

  const onResize = () => {
    const nw = container.clientWidth;
    const nh = container.clientHeight;
    const aspect = nw / nh;

    camera.left = (-ORTHO_VIEW_H * aspect) / 2;
    camera.right = (ORTHO_VIEW_H * aspect) / 2;
    camera.top = ORTHO_VIEW_H / 2;
    camera.bottom = -ORTHO_VIEW_H / 2;

    camera.updateProjectionMatrix();
    renderer.setSize(nw, nh);
  };
  window.addEventListener("resize", onResize);

  return {
    textures,
    setRendering: (active: boolean) => {
      rendering = active;
    },
    dispose: () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      gsap.killTweensOf(textures.map((t) => t.texture.offset));
      disposables.forEach((obj) => {
        scene.remove(obj);
        obj.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            const mats = Array.isArray(child.material)
              ? child.material
              : [child.material];
            mats.forEach((m) => {
              m.map?.dispose();
              m.dispose();
            });
          }
        });
      });
      renderer.dispose();
      container.removeChild(renderer.domElement);
    },
  };
}

gsap.registerPlugin(useGSAP);

export function RibbonCanvas({ ribbonText }: { ribbonText: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const scene = createRibbonScene(containerRef.current, {
        ribbonText,
        align: "right",
      });

      const tweens = prefersReducedMotion
        ? []
        : scene.textures.map(({ texture, direction, duration }) => {
            texture.offset.set(0, 0);
            return gsap.to(texture.offset, {
              x: direction,
              duration,
              repeat: -1,
              ease: "none",
            });
          });

      if (prefersReducedMotion) {
        scene.setRendering(false);
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          const visible = entry.isIntersecting;
          if (prefersReducedMotion) {
            scene.setRendering(visible);
            return;
          }
          scene.setRendering(visible);
          tweens.forEach((tween) => (visible ? tween.play() : tween.pause()));
        },
        { rootMargin: "120px 0px", threshold: 0 },
      );
      observer.observe(containerRef.current);

      return () => {
        observer.disconnect();
        tweens.forEach((tween) => tween.kill());
        scene.dispose();
      };
    },
    { scope: containerRef, dependencies: [ribbonText, prefersReducedMotion] },
  );

  return <div ref={containerRef} className="h-full w-full" aria-hidden />;
}
