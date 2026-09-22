"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldHalf, ArrowRight } from "lucide-react";
import { signIn, DEMO_EMAIL, DEMO_PASSWORD } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (signIn(email, password)) {
      router.push("/dashboard");
    } else {
      setError("Invalid demo credentials. Use the ones shown below, or click \"Use demo credentials\".");
    }
  }

  function fillDemo() {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setError("");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <ShieldHalf className="h-8 w-8 text-amber" strokeWidth={1.75} />
          <h1 className="text-lg font-semibold text-ink">Sign in to AdAegis</h1>
          <p className="text-sm text-ink-muted">Product demo — no real account is created or accessed.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 rounded-lg border border-border bg-surface p-6">
          <div>
            <label className="mb-1 block text-xs font-medium text-ink-muted">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={DEMO_EMAIL}
              className="w-full rounded-md border border-border bg-canvas px-3 py-2 text-sm text-ink outline-none focus:border-amber"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-ink-muted">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
              className="w-full rounded-md border border-border bg-canvas px-3 py-2 text-sm text-ink outline-none focus:border-amber"
            />
          </div>

          {error ? <p className="text-xs text-danger">{error}</p> : null}

          <Button type="submit" className="w-full">
            Sign in
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
          </Button>

          <button
            type="button"
            onClick={fillDemo}
            className="w-full rounded-md border border-dashed border-border py-2 text-xs text-ink-muted hover:border-amber hover:text-amber"
          >
            Use demo credentials
          </button>
        </form>

        <div className="mt-4 rounded-md border border-border-soft bg-canvas-raised px-4 py-3 text-center text-xs text-ink-faint">
          Demo login · {DEMO_EMAIL} / {DEMO_PASSWORD}
        </div>

        <p className="mt-6 text-center text-xs text-ink-faint">
          <Link href="/" className="hover:text-ink-muted">
            ← Back to overview
          </Link>
        </p>
      </div>
    </div>
  );
}
