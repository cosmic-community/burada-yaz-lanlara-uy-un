import Link from 'next/link'
import type { Istiqamet } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import { getDirectionIcon } from '@/lib/utils'

interface DirectionCardProps {
  istiqamet: Istiqamet
  slideCount?: number
}

export default function DirectionCard({ istiqamet, slideCount }: DirectionCardProps) {
  const basliq = getMetafieldValue(istiqamet.metadata?.basliq) || istiqamet.title
  const tesvir = getMetafieldValue(istiqamet.metadata?.tesvir)
  const icon = getDirectionIcon(istiqamet)

  return (
    <Link
      href={`/istiqametler/${istiqamet.slug}`}
      className="group block bg-white rounded-2xl border border-slate-200 p-6 hover:border-brand-300 hover:shadow-lg transition-all duration-200"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-2xl group-hover:bg-brand-100 transition-colors">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 text-lg group-hover:text-brand-600 transition-colors text-balance">
            {basliq}
          </h3>
          {tesvir && (
            <p className="mt-2 text-sm text-slate-600 line-clamp-3">{tesvir}</p>
          )}
          {typeof slideCount === 'number' && (
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full">
              {slideCount} slayd
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}