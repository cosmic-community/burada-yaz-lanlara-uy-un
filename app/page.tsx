import Link from 'next/link'
import { getIstiqametler, getSlaydlar } from '@/lib/cosmic'
import DirectionCard from '@/components/DirectionCard'
import { groupSlidesByDirection } from '@/lib/utils'

export default async function HomePage() {
  const [directions, slides] = await Promise.all([getIstiqametler(), getSlaydlar()])

  const grouped = groupSlidesByDirection(slides)
  const countByDirection = new Map<string, number>()
  for (const group of grouped) {
    if (group.istiqamet) {
      countByDirection.set(group.istiqamet.id, group.slides.length)
    }
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-sm font-medium backdrop-blur-sm mb-6">
              📊 Prezentasiya
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white text-balance leading-tight">
              Çatışmazlıqlar və Tədbirlər Planı
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/80 leading-relaxed">
              Sınaq müddətində ADDA-da müəyyən olunan çatışmazlıqlar, onların aradan
              qaldırılması üçün görüləcək işlər və gözlənilən nəticələr — istiqamətlər üzrə
              sistemli şəkildə təqdim olunur.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/slaydlar"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-brand-700 font-semibold hover:bg-brand-50 transition-colors"
              >
                Prezentasiyaya başla →
              </Link>
              <Link
                href="/istiqametler"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 backdrop-blur-sm transition-colors"
              >
                İstiqamətlərə bax
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <p className="text-4xl font-extrabold text-brand-600">{directions.length}</p>
            <p className="mt-1 text-slate-600 font-medium">İstiqamət</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <p className="text-4xl font-extrabold text-brand-600">{slides.length}</p>
            <p className="mt-1 text-slate-600 font-medium">Slayd</p>
          </div>
        </div>
      </section>

      {/* Directions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">İstiqamətlər</h2>
            <p className="mt-2 text-slate-600">
              Oxşar çatışmazlıqlar bir qrup altında sistemləşdirilib.
            </p>
          </div>
          <Link
            href="/istiqametler"
            className="hidden sm:inline-flex text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            Hamısına bax →
          </Link>
        </div>

        {directions.length === 0 ? (
          <div className="text-center py-16 text-slate-500 bg-white rounded-2xl border border-slate-200">
            Hələ istiqamət əlavə edilməyib.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {directions.map((dir) => (
              <DirectionCard
                key={dir.id}
                istiqamet={dir}
                slideCount={countByDirection.get(dir.id) ?? 0}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}