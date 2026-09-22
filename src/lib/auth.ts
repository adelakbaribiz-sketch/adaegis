// Client-side demo auth only. There is no backend session, no password
// hashing, and no real account system — see docs/SECURITY.md. This exists
// purely to gate the /app demo behind a login screen for presentation.

const STORAGE_KEY = "adaegis-demo-session";

export const DEMO_EMAIL = "demo@adaegis.io";
export const DEMO_PASSWORD = "adaegis-demo";

export function signIn(email: string, password: string): boolean {
  if (email.trim().toLowerCase() !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
    return false;
  }
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, "1");
  }
  return true;
}

export function signOut() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(STORAGE_KEY);
  }
}

export function isSignedIn(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(STORAGE_KEY) === "1";
}
