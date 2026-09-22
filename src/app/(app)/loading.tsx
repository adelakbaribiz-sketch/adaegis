export default function Loading() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-6 w-48 rounded bg-surface" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 rounded-lg border border-border bg-surface" />
        ))}
      </div>
      <div className="h-64 rounded-lg border border-border bg-surface" />
    </div>
  );
}
