export function FoodFormSkeleton() {
    return (
      <div className="space-y-4 animate-pulse">
        <div>
          <div className="h-5 bg-base-content rounded opacity-30 mb-2 w-36"></div>
          <div className="h-12 bg-base-content rounded opacity-30"></div>
        </div>
        <div>
          <div className="h-5 bg-base-content rounded opacity-30 mt-2 mb-2 w-36"></div>
          <div className="h-12 bg-base-content rounded opacity-30"></div>
        </div>
        <div>
          <div className="h-5 bg-base-content rounded opacity-30 mt-2 mb-2 w-36"></div>
          <div className="h-12 bg-base-content rounded opacity-30"></div>
        </div>
        <div>
          <button className="btn btn-disabled loading">Loading</button>
        </div>
      </div>
    )
  }