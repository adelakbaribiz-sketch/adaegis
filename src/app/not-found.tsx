import Link from "next/link";
import { ShieldHalf } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-canvas px-4 text-center">
      <ShieldHalf className="h-8 w-8 text-ink-faint" strokeWidth={1.5} />
      <h1 className="text-lg font-semibold text-ink">Page not found</h1>
      <p className="max-w-sm text-sm text-ink-muted">
        Nothing lives at this address. It may have been a demo record that doesn&apos;t exist in the mock dataset.
      </p>
      <Link href="/dashboard" className="mt-2 text-sm text-amber hover:underline">
        Back to dashboard
      </Link>
    </div>
  );
}
