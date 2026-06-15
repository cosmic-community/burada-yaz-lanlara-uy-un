import Link from 'next/link'
import type { Slayd } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import { getSlideTitle, getSlideType } from '@/lib/utils'

interface SlideCardProps {
  slayd: Slayd
}

export default function SlideCard({ slayd }: SlideCardProps) {
  const title = getSlideTitle(slayd)
  const type = getSlideType(slayd)
  const aciqlama = getMetafieldValue(slayd.metadata?.qisa_aciqlama)
  const dir = slayd.metadata?.istiqamet
  const dirTitle = dir ? getMetafieldValue(dir.metadata?.basliq) || dir.title : ''
  const sira = slayd.metadata?.sira
  const image = slayd.metadata?.slayd_sekli

  return (
    <Link
      href={`/slaydlar/${slayd.slug}`}
      className="group block bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-brand-300 hover:shadow-lg transition-all duration-200"
    >
      {image && image.imgix_url && (
        <div className="aspect-video overflow-hidden bg-slate-100">
          <img
            src={`${image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={title}
            width={400}
            height={225}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {typeof sira === 'number' && (
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-brand-600 text-white text-xs font-bold">
              {sira}
            </span>
          )}
          {type && (
            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
              {type}
            </span>
          )}
          {dirTitle && (
            <span className="text-xs font-medium text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full truncate max-w-[160px]">
              {dirTitle}
            </span>
          )}
        </div>
        <h3 className="font-semibold text-slate-900 text-lg group-hover:text-brand-600 transition-colors text-balance">
          {title}
        </h3>
        {aciqlama && (
          <p className="mt-2 text-sm text-slate-600 line-clamp-2">{aciqlama}</p>
        )}
      </div>
    </Link>
  )
}