// Access codes come from an environment variable so you never commit them to git.
// Set ACCESS_CODES in your Vercel project settings, comma-separated, e.g.:
//   ACCESS_CODES=TEACHER2026,CAMP-BLUE,CAMP-RED
const RAW_CODES = process.env.ACCESS_CODES || "";

export function validCodes(): string[] {
  return RAW_CODES.split(",")
    .map((c) => c.trim())
    .filter(Boolean);
}

export function isValidAccessCode(code: string): boolean {
  const normalized = code.trim().toUpperCase();
  return validCodes().some((c) => c.toUpperCase() === normalized);
}

export const SESSION_COOKIE = "portal_session";
