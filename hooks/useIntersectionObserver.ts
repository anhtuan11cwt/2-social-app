"use client";

import { useEffect } from "react";

type UseIntersectionObserverProps = {
  target: React.RefObject<Element | null>;
  onIntersect: () => void;
  enabled?: boolean;
  rootMargin?: string;
  threshold?: number;
};

export function useIntersectionObserver({
  target,
  onIntersect,
  enabled = true,
  rootMargin = "200px",
  threshold = 0.5,
}: UseIntersectionObserverProps) {
  useEffect(() => {
    if (!enabled) return;
    if (!target.current) return;

    const element = target.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      {
        root: null,
        rootMargin,
        threshold,
      },
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [target, enabled, onIntersect, rootMargin, threshold]);
}
