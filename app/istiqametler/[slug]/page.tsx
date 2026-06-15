// app/istiqametler/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getIstiqametBySlug, getSlaydlarByIstiqamet } from '@/lib/cosmic'
import { getMetafieldValue } from '@/lib/cosmic'
import { getDirectionIcon } from '@/lib/utils'
import SlideCard from '@/components/SlideCard'

export default async function IstiqametDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const istiqamet = await getIstiqametBySlug(slug)

  if (!istiqamet) {
    notFound()
  }

  const slides = await getSlaydlarByIstiqamet(istiqamet.id)
  const basliq = getMetafieldValue(istiqamet.metadata?.basliq) || istiqamet.title
  const tesvir = getMetafieldValue(istiqamet.metadata?.tesvir)
  const icon = getDirectionIcon(istiqamet)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/istiqametler"
        className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-brand-600 mb-8"
      >
        ← İstiqamətlər
      </Link>

      <div className="flex items-start gap-5 mb-10">
        <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center text-3xl">
          {icon}
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 text-balance">
            {basliq}
          </h1>
          {tesvir && <p className="mt-3 text-slate-600 max-w-2xl">{tesvir}</p>}
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-700 bg-brand-50 px-3 py-1 rounded-full">
            {slides.length} slayd
          </span>
        </div>
      </div>

      {slides.length === 0 ? (
        <div className="text-center py-16 text-slate-500 bg-white rounded-2xl border border-slate-200">
          Bu istiqamət üzrə hələ slayd əlavə edilməyib.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {slides.map((slayd) => (
            <SlideCard key={slayd.id} slayd={slayd} />
          ))}
        </div>
      )}
    </div>
  )
}