"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isSignedIn } from "@/lib/auth";
import { Sidebar } from "@/components/shell/sidebar";
import { Topbar } from "@/components/shell/topbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  // Session lives in localStorage, which doesn't exist during server
  // rendering, so "signed in" can only be known after mount — starting both
  // server and client renders from `false` avoids a hydration mismatch.
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing with browser storage unavailable during SSR, not derivable at render time
      setSignedIn(true);
    } else {
      router.replace("/login");
    }
  }, [router]);

  if (!signedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas text-sm text-ink-muted">
        Loading demo workspace…
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto px-6 py-6">{children}</main>
      </div>
    </div>
  );
}
