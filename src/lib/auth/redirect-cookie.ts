export const AUTH_REDIRECT_COOKIE = "ltl_auth_redirect";
export const AUTH_REDIRECT_MAX_AGE = 60 * 10;

export function buildAuthRedirectCookie(path: string): string {
  return `${AUTH_REDIRECT_COOKIE}=${encodeURIComponent(path)}; path=/; max-age=${AUTH_REDIRECT_MAX_AGE}; SameSite=Lax`;
}
