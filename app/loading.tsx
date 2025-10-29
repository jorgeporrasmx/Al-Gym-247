export default function Loading() {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Header Skeleton */}
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur">
        <div className="container flex h-14 md:h-16 items-center justify-between px-3 md:px-4 gap-2 md:gap-4">
          {/* Logo skeleton */}
          <div className="h-10 w-24 md:h-12 md:w-28 bg-gray-200 rounded" />

          {/* Navigation skeleton */}
          <div className="hidden md:flex gap-4">
            <div className="h-8 w-20 bg-gray-200 rounded" />
            <div className="h-8 w-20 bg-gray-200 rounded" />
            <div className="h-8 w-20 bg-gray-200 rounded" />
          </div>

          {/* Buttons skeleton */}
          <div className="flex gap-2">
            <div className="h-9 w-9 bg-gray-200 rounded-lg" />
            <div className="h-9 w-20 md:w-28 bg-gray-200 rounded-lg" />
            <div className="hidden sm:block h-9 w-24 md:w-32 bg-gray-200 rounded-lg" />
          </div>
        </div>
      </header>

      {/* Hero Section Skeleton */}
      <section className="py-0 md:py-2 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-2 md:gap-4 lg:gap-6 items-center">
            {/* Left Content Skeleton */}
            <div className="space-y-2 md:space-y-3">
              {/* Title skeleton */}
              <div className="space-y-2">
                <div className="h-8 md:h-12 lg:h-16 w-3/4 bg-gray-200 rounded" />
                <div className="h-8 md:h-12 lg:h-16 w-2/3 bg-gray-200 rounded" />
                <div className="h-6 md:h-8 w-1/2 bg-gray-200 rounded mt-2" />
              </div>

              {/* Buttons skeleton */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="h-10 md:h-12 w-full sm:w-40 bg-gray-200 rounded-lg" />
                <div className="h-10 md:h-12 w-full sm:w-40 bg-gray-200 rounded-lg" />
              </div>

              {/* Rating skeleton */}
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-4 w-4 md:h-5 md:w-5 bg-gray-200 rounded" />
                  ))}
                </div>
                <div className="h-4 w-32 bg-gray-200 rounded" />
              </div>

              {/* Testimonial skeleton - Hidden on mobile */}
              <div className="hidden md:block bg-white p-4 lg:p-6 rounded-lg shadow-sm">
                <div className="space-y-2 mb-3">
                  <div className="h-3 w-full bg-gray-200 rounded" />
                  <div className="h-3 w-full bg-gray-200 rounded" />
                  <div className="h-3 w-3/4 bg-gray-200 rounded" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-200 rounded-full" />
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                </div>
              </div>
            </div>

            {/* Video Section Skeleton */}
            <div>
              <div className="relative bg-gray-200 rounded-2xl overflow-hidden aspect-video">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-400 rounded-full animate-spin" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section Skeleton */}
      <section className="py-12 md:py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Title skeleton */}
          <div className="text-center mb-8 md:mb-12">
            <div className="h-8 md:h-10 w-48 md:w-64 bg-gray-200 rounded mx-auto mb-3" />
            <div className="h-4 w-64 md:w-96 bg-gray-200 rounded mx-auto" />
          </div>

          {/* Features grid skeleton */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="h-48 bg-gray-200 rounded-lg mb-4" />
                <div className="h-6 w-3/4 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-full bg-gray-200 rounded mb-1" />
                <div className="h-4 w-5/6 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations Section Skeleton */}
      <section className="py-12 md:py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="h-8 md:h-10 w-48 bg-gray-200 rounded mx-auto mb-8" />
          <div className="grid md:grid-cols-2 gap-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-white border rounded-lg p-6">
                <div className="h-6 w-2/3 bg-gray-200 rounded mb-4" />
                <div className="space-y-2 mb-4">
                  <div className="h-4 w-full bg-gray-200 rounded" />
                  <div className="h-4 w-5/6 bg-gray-200 rounded" />
                </div>
                <div className="h-10 w-full bg-gray-200 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Skeleton */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="h-5 w-24 bg-gray-700 rounded mb-3" />
                <div className="space-y-2">
                  <div className="h-3 w-full bg-gray-700 rounded" />
                  <div className="h-3 w-5/6 bg-gray-700 rounded" />
                  <div className="h-3 w-4/6 bg-gray-700 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
