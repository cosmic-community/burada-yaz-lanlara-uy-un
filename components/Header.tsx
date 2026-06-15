import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">📊</span>
            <span className="font-bold text-slate-900 text-lg group-hover:text-brand-600 transition-colors">
              Prezentasiya
            </span>
          </Link>
          <nav className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/"
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-brand-600 hover:bg-brand-50 transition-colors"
            >
              Ana səhifə
            </Link>
            <Link
              href="/istiqametler"
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-brand-600 hover:bg-brand-50 transition-colors"
            >
              İstiqamətlər
            </Link>
            <Link
              href="/slaydlar"
              className="px-3 py-2 rounded-lg text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 transition-colors"
            >
              Slaydlar
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}