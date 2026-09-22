"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AppError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-danger/30 px-6 py-16 text-center">
      <AlertTriangle className="h-6 w-6 text-danger" strokeWidth={1.75} />
      <p className="text-sm font-medium text-ink">Something went wrong loading this page</p>
      <p className="max-w-sm text-xs text-ink-muted">
        This is a demo environment error boundary. In production this would report to an error tracker.
      </p>
      <Button size="sm" variant="secondary" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}
