"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";
const SCRIPT_URL = "https://www.google.com/recaptcha/api.js?render=" + SITE_KEY;

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

/**
 * Load reCAPTCHA v3 script and provide getToken(action).
 * If NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set, getToken returns null (backend will skip verification).
 */
export function useRecaptcha() {
  const [ready, setReady] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    if (!SITE_KEY || loaded.current) return;
    if (typeof window === "undefined") return;

    if (window.grecaptcha) {
      window.grecaptcha.ready(() => setReady(true));
      loaded.current = true;
      return;
    }

    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    script.async = true;
    script.onload = () => {
      window.grecaptcha?.ready(() => {
        setReady(true);
        loaded.current = true;
      });
    };
    document.head.appendChild(script);
    return () => {
      // Don't remove script so multiple forms can use it
    };
  }, []);

  const getToken = useCallback(
    async (action: string): Promise<string | null> => {
      if (!SITE_KEY) return null;
      if (typeof window === "undefined" || !window.grecaptcha) return null;
      try {
        await new Promise<void>((resolve) => {
          if (ready) resolve();
          else window.grecaptcha?.ready(() => resolve());
        });
        const token = await window.grecaptcha.execute(SITE_KEY, { action });
        return token ?? null;
      } catch {
        return null;
      }
    },
    [ready]
  );

  return { getToken, isAvailable: !!SITE_KEY };
}
