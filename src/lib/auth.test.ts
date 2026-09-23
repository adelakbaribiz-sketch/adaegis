import { describe, expect, it } from "vitest";
import { isSignedIn } from "./auth";

// Regression test for the hydration-mismatch bug fixed in
// src/app/(app)/layout.tsx: isSignedIn() is read inside a useEffect
// specifically because it must return a safe, consistent value in an
// environment with no `window` (server rendering). This test runs with
// Vitest's default "node" environment, which has no `window` global, the
// same as a Next.js Server Component render — so a regression here would
// mean a real SSR crash, not just a hydration warning.
describe("isSignedIn (server-rendering safety)", () => {
  it("returns false instead of throwing when window is undefined", () => {
    expect(typeof window).toBe("undefined");
    expect(isSignedIn()).toBe(false);
  });
});
