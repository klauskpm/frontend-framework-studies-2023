export function FoodFormSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div>
        <div className="mb-2 h-5 w-36 rounded bg-base-content opacity-30"></div>
        <div className="h-12 rounded bg-base-content opacity-30"></div>
      </div>
      <div>
        <div className="mb-2 mt-2 h-5 w-36 rounded bg-base-content opacity-30"></div>
        <div className="h-12 rounded bg-base-content opacity-30"></div>
      </div>
      <div>
        <div className="mb-2 mt-2 h-5 w-36 rounded bg-base-content opacity-30"></div>
        <div className="h-12 rounded bg-base-content opacity-30"></div>
      </div>
      <div>
        <button className="btn-disabled loading btn">Loading</button>
      </div>
    </div>
  );
}
