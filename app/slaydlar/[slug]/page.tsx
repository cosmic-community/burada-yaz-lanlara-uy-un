// app/slaydlar/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getSlaydBySlug, getMetafieldValue } from '@/lib/cosmic'
import { getSlideTitle, getSlideType } from '@/lib/utils'
import SlideSection from '@/components/SlideSection'

export default async function SlaydDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const slayd = await getSlaydBySlug(slug)

  if (!slayd) {
    notFound()
  }

  const title = getSlideTitle(slayd)
  const type = getSlideType(slayd)
  const aciqlama = getMetafieldValue(slayd.metadata?.qisa_aciqlama)
  const catismazliqlar = getMetafieldValue(slayd.metadata?.catismazliqlar)
  const gorulecekIsler = getMetafieldValue(slayd.metadata?.gorulecek_isler)
  const neticeler = getMetafieldValue(slayd.metadata?.neticeler)
  const image = slayd.metadata?.slayd_sekli
  const dir = slayd.metadata?.istiqamet
  const dirTitle = dir ? getMetafieldValue(dir.metadata?.basliq) || dir.title : ''

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/slaydlar"
          className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-brand-600"
        >
          ← Bütün slaydlar
        </Link>
        {dir && (
          <Link
            href={`/istiqametler/${dir.slug}`}
            className="text-sm font-medium text-brand-700 bg-brand-50 px-3 py-1 rounded-full hover:bg-brand-100 transition-colors truncate max-w-[200px]"
          >
            {dirTitle}
          </Link>
        )}
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {image && image.imgix_url && (
          <div className="aspect-video overflow-hidden bg-slate-100">
            <img
              src={`${image.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
              alt={title}
              width={800}
              height={450}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-6 sm:p-10">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {type && (
              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                {type}
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 text-balance mb-4">
            {title}
          </h1>
          {aciqlama && (
            <p className="text-slate-600 text-lg leading-relaxed mb-8">{aciqlama}</p>
          )}

          <div className="space-y-4">
            <SlideSection
              icon="⚠️"
              title="Çatışmazlıqlar"
              content={catismazliqlar}
              accent="red"
            />
            <SlideSection
              icon="🛠️"
              title="Görüləcək işlər"
              content={gorulecekIsler}
              accent="blue"
            />
            <SlideSection
              icon="✅"
              title="Nəticələr"
              content={neticeler}
              accent="green"
            />
          </div>
        </div>
      </div>
    </div>
  )
}