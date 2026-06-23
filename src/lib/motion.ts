"use client";

import { useEffect, useState } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function getPrefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

export function subscribePrefersReducedMotion(
  onChange: (reduced: boolean) => void,
): () => void {
  if (typeof window === "undefined") return () => {};

  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  onChange(mq.matches);

  const handler = () => onChange(mq.matches);
  mq.addEventListener("change", handler);
  return () => mq.removeEventListener("change", handler);
}

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => subscribePrefersReducedMotion(setReduced), []);

  return reduced;
}
