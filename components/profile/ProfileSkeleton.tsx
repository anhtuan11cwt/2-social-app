export default function ProfileSkeleton() {
  return (
    <div className="mx-auto max-w-2xl">
      {/* Profile Header Skeleton */}
      <div className="p-6 border-gray-800 border-b">
        <div className="flex sm:flex-row flex-col items-start sm:items-center gap-6">
          {/* Avatar Skeleton */}
          <div className="bg-gray-700 rounded-full w-24 h-24 animate-pulse" />

          {/* User Info Skeleton */}
          <div className="flex-1 space-y-2 min-w-0">
            {/* Name Skeleton */}
            <div className="bg-gray-700 rounded w-48 h-8 animate-pulse" />

            {/* Username Skeleton */}
            <div className="bg-gray-700 rounded w-32 h-4 animate-pulse" />

            {/* Bio Skeleton */}
            <div className="space-y-1">
              <div className="bg-gray-700 rounded w-full h-3 animate-pulse" />
              <div className="bg-gray-700 rounded w-3/4 h-3 animate-pulse" />
            </div>

            {/* Stats Skeleton */}
            <div className="flex gap-6">
              <div className="text-center">
                <div className="bg-gray-700 rounded w-8 h-4 animate-pulse" />
                <div className="bg-gray-700 mt-1 rounded w-12 h-3 animate-pulse" />
              </div>
              <div className="text-center">
                <div className="bg-gray-700 rounded w-8 h-4 animate-pulse" />
                <div className="bg-gray-700 mt-1 rounded w-16 h-3 animate-pulse" />
              </div>
              <div className="text-center">
                <div className="bg-gray-700 rounded w-8 h-4 animate-pulse" />
                <div className="bg-gray-700 mt-1 rounded w-16 h-3 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Button Skeleton */}
        <div className="mt-6">
          <div className="bg-gray-700 rounded w-32 h-10 animate-pulse" />
        </div>
      </div>

      {/* Posts Section Skeleton */}
      <div className="p-6">
        <div className="bg-gray-700 mb-4 rounded w-20 h-6 animate-pulse" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              className="space-y-2 p-4 border border-gray-800 rounded-lg"
              key={i}
            >
              <div className="bg-gray-700 rounded w-3/4 h-4 animate-pulse" />
              <div className="bg-gray-700 rounded w-1/2 h-3 animate-pulse" />
              <div className="bg-gray-700 rounded w-2/3 h-3 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
