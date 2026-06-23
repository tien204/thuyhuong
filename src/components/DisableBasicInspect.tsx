"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const BLOCKED_PATH = "/404";

function isInspectShortcut(e: KeyboardEvent): boolean {
  const key = e.key.toLowerCase();

  return (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(key)) ||
    (e.metaKey && e.altKey && ["i", "j", "c"].includes(key)) ||
    (e.ctrlKey && key === "u") ||
    (e.metaKey && key === "u")
  );
}

export function DisableBasicInspect() {
  const router = useRouter();

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;

    const redirectTo404 = () => {
      router.replace(BLOCKED_PATH);
    };

    const blockContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const blockKeys = (e: KeyboardEvent) => {
      if (!isInspectShortcut(e)) return;

      e.preventDefault();
      redirectTo404();
    };

    document.addEventListener("contextmenu", blockContextMenu);
    document.addEventListener("keydown", blockKeys);

    return () => {
      document.removeEventListener("contextmenu", blockContextMenu);
      document.removeEventListener("keydown", blockKeys);
    };
  }, [router]);

  return null;
}
