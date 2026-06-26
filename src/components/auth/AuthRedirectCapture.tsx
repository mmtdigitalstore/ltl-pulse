"use client";

import { useEffect } from "react";

import {
  AUTH_REDIRECT_MAX_AGE,
  AUTH_REDIRECT_COOKIE,
} from "@/lib/auth/redirect-cookie";

interface AuthRedirectCaptureProps {
  redirectPath: string;
}

export function AuthRedirectCapture({ redirectPath }: AuthRedirectCaptureProps) {
  useEffect(() => {
    if (redirectPath === "/") {
      return;
    }

    document.cookie = `${AUTH_REDIRECT_COOKIE}=${encodeURIComponent(redirectPath)}; path=/; max-age=${AUTH_REDIRECT_MAX_AGE}; SameSite=Lax`;
  }, [redirectPath]);

  return null;
}
