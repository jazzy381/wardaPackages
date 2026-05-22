export default function ShopLoading() {
  return (
    <main className="min-h-screen bg-[#fcfaf9]">
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-br from-[#7e22ce] via-[#581c87] to-[#3b0764]"></div>
      <div className="pt-48 pb-20 px-6 lg:px-12 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="h-10 w-48 bg-gray-200 animate-pulse rounded-xl mx-auto mb-4"></div>
          <div className="h-4 w-72 bg-gray-200 animate-pulse rounded-xl mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-[2rem] p-6 shadow-xl shadow-black/10">
              <div className="w-full h-48 bg-gray-200 animate-pulse rounded-2xl mb-6"></div>
              <div className="h-5 bg-gray-200 animate-pulse rounded mb-2"></div>
              <div className="h-4 w-2/3 bg-gray-100 animate-pulse rounded mb-4"></div>
              <div className="h-10 bg-gray-200 animate-pulse rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
