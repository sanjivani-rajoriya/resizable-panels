"use client";

import { useEffect, useState, useRef } from "react";
import ResizablePanel from "./ResizablePanel";
import ResizeHandle from "./ResizeHandle";

const MIN_WIDTH = 100;
const MAX_WIDTH = 800;

type PanelSizes = {
  left: number;
  main: number | "auto";
  right: number;
};

export default function ResizableLayout() {
  const [sizes, setSizes] = useState<PanelSizes>({
    left: 280,
    main: "auto",
    right: 360,
  });

  const dragInfo = useRef<{
    type: "left" | "right";
    startX: number;
    startSize: number;
  } | null>(null);

  // ---- URL Sync ----
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const l = params.get("l");
    const r = params.get("r");
    setSizes({
      left: l ? parseInt(l, 10) : 280,
      main: "auto",
      right: r ? parseInt(r, 10) : 360,
    });

    const onPop = () => {
      const params = new URLSearchParams(window.location.search);
      setSizes({
        left: parseInt(params.get("l") || "280", 10),
        main: "auto",
        right: parseInt(params.get("r") || "360", 10),
      });
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("l", String(sizes.left));
    params.set("r", String(sizes.right));
    window.history.replaceState(null, "", "?" + params.toString());
  }, [sizes]);

  // ---- Mouse drag ----
  const onMouseDown = (type: "left" | "right", e: React.MouseEvent) => {
    dragInfo.current = {
      type,
      startX: e.clientX,
      startSize: sizes[type] as number,
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!dragInfo.current) return;
    const { type, startX, startSize } = dragInfo.current;
    let delta = e.clientX - startX;
    if (type === "right") delta = -delta;
    const newSize = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startSize + delta));
    setSizes((s) => ({ ...s, [type]: newSize }));
  };

  const onMouseUp = () => {
    dragInfo.current = null;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  // ---- Keyboard resizing ----
  const onKeyDown = (type: "left" | "right", e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      const step = e.shiftKey ? 32 : 8;
      const delta = e.key === "ArrowLeft" ? -step : step;
      setSizes((s) => {
        const current = s[type] as number;
        let newSize = type === "left" ? current + delta : current - delta;
        newSize = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, newSize));
        return { ...s, [type]: newSize };
      });
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left Panel */}
      <ResizablePanel width={sizes.left} bg="bg-gray-100 text-black">
        <h2 className="font-bold">Left Panel</h2>
        <p>Resizable sidebar content</p>
      </ResizablePanel>

      {/* Handle Left */}
      <ResizeHandle
        type="left"
        size={sizes.left}
        onMouseDown={onMouseDown}
        onKeyDown={onKeyDown}
      />

      {/* Main Panel */}
      <div className="flex-1 bg-black p-4 overflow-auto">
        <h1 className="text-xl font-bold">Main Content</h1>
        <p>This is the main area. It adjusts automatically.</p>
      </div>

      {/* Handle Right */}
      <ResizeHandle
        type="right"
        size={sizes.right}
        onMouseDown={onMouseDown}
        onKeyDown={onKeyDown}
      />

      {/* Right Panel */}
      <ResizablePanel width={sizes.right} bg="bg-gray-100 text-black">
        <h2 className="font-bold">Right Panel</h2>
        <p>Resizable info sidebar</p>
      </ResizablePanel>
    </div>
  );
}
