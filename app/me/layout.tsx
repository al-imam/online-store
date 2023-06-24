import Sidebar from "$components/layout/Sidebar";

export default function ({ children }: { children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 sm:gap-6">
          <Sidebar />
          <main className="p-2 lg:p-4 sm:col-span-3 border border-gray-200 bg-white shadow-sm rounded">
            {children}
          </main>
        </div>
      </div>
    </section>
  );
}
