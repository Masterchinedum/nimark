const ProductCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="group cursor-pointer rounded-xl border p-3 space-y-4 animate-pulse">
          {/* Image skeleton */}
          <div className="aspect-square rounded-md bg-gray-200" />
          {/* Text skeleton */}
          <div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
          {/* Price skeleton */}
          <div className="flex items-center justify-between">
            <div className="h-5 bg-gray-200 rounded w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCardSkeleton;
