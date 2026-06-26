export function getSafeRedirectPath(path: string | undefined | null): string {
  if (!path || !path.startsWith("/") || path.startsWith("//")) {
    return "/";
  }

  return path;
}

export function getPostAuthRedirect(path: string): string {
  const safePath = getSafeRedirectPath(path);

  if (safePath === "/concierge" || safePath.startsWith("/concierge?")) {
    return "/concierge?welcome=1";
  }

  return safePath;
}
