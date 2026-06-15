import { getIstiqametler, getSlaydlar } from '@/lib/cosmic'
import DirectionCard from '@/components/DirectionCard'
import { groupSlidesByDirection } from '@/lib/utils'

export const metadata = {
  title: 'İstiqamətlər | Burada yazılanlara uyğun',
}

export default async function IstiqametlerPage() {
  const [directions, slides] = await Promise.all([getIstiqametler(), getSlaydlar()])

  const grouped = groupSlidesByDirection(slides)
  const countByDirection = new Map<string, number>()
  for (const group of grouped) {
    if (group.istiqamet) {
      countByDirection.set(group.istiqamet.id, group.slides.length)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">İstiqamətlər</h1>
        <p className="mt-3 text-slate-600 max-w-2xl">
          Çatışmazlıqlar oxşarlığına görə qruplaşdırılaraq aşağıdakı istiqamətlər altında
          birləşdirilmişdir.
        </p>
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
    </div>
  )
}