export function RoundedSkeleton({ className }: any) {
  const cssClasses = `animate-pulse rounded-full bg-base-content ${className}`;
  return <div className={cssClasses}></div>;
}
