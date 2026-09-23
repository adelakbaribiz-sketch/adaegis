export function ChartSkeleton({ height = 220 }: { height?: number }) {
  return (
    <div
      className="animate-pulse rounded-md bg-surface-hover"
      style={{ height }}
      aria-hidden="true"
    />
  );
}
