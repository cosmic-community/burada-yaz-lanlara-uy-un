export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-slate-200 bg-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {year} Burada yazılanlara uyğun — Prezentasiya
          </p>
          <p className="text-sm text-slate-400">
            ADDA · Çatışmazlıqlar və Tədbirlər planı
          </p>
        </div>
      </div>
    </footer>
  )
}