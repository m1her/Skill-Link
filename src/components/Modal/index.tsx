"use client";
import { useCallback, useRef, useEffect, MouseEventHandler } from "react";

export default function Modal({
  children,
  onDismiss,
}: {
  children: React.ReactNode;
  onDismiss: () => void;
}) {
  const overlay = useRef(null);
  const wrapper = useRef(null);

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div
      ref={overlay}
      className="fixed z-40 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60 p-10"
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className="absolute bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10/12 md:w-8/12 lg:w-2/5 p-6 rounded"
      >
        {children}
      </div>
    </div>
  );
}
