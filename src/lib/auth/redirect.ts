export function getSafeRedirectPath(path: string | undefined | null): string {
  if (!path) {
    return "/";
  }

  let normalized = path.trim();

  try {
    normalized = decodeURIComponent(normalized);
  } catch {
    // use raw value if decoding fails
  }

  if (!normalized.startsWith("/") || normalized.startsWith("//")) {
    return "/";
  }

  return normalized;
}

/** Build login/signup href preserving the current page as post-auth destination. */
export function buildAuthHref(
  mode: "login" | "signup",
  pathname: string,
  search: string,
): string {
  const base = mode === "login" ? "/login" : "/signup";

  if (
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname.startsWith("/auth/")
  ) {
    return base;
  }

  const next = search ? `${pathname}?${search}` : pathname;
  return `${base}?next=${encodeURIComponent(next)}`;
}

export function getPostAuthRedirect(path: string): string {
  const safePath = getSafeRedirectPath(path);

  if (safePath === "/concierge" || safePath.startsWith("/concierge?")) {
    const query = safePath.includes("?") ? safePath.slice(safePath.indexOf("?") + 1) : "";
    const params = new URLSearchParams(query);
    params.set("welcome", "1");
    return `/concierge?${params.toString()}`;
  }

  return safePath;
}
