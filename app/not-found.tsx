import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="text-6xl mb-6">🔍</div>
      <h1 className="text-3xl font-bold text-slate-900 mb-3">Səhifə tapılmadı</h1>
      <p className="text-slate-600 mb-8">
        Axtardığınız səhifə mövcud deyil və ya köçürülüb.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors"
      >
        Ana səhifəyə qayıt
      </Link>
    </div>
  )
}