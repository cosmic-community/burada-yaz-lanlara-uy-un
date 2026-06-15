'use client'

import { useState, useCallback, useEffect } from 'react'
import type { Slayd } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import { getSlideTitle, getSlideType } from '@/lib/utils'
import SlideSection from '@/components/SlideSection'

interface SlideNavigatorProps {
  slides: Slayd[]
}

export default function SlideNavigator({ slides }: SlideNavigatorProps) {
  const [index, setIndex] = useState<number>(0)

  const total = slides.length

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1 < total ? i + 1 : i))
  }, [total])

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 >= 0 ? i - 1 : i))
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [goNext, goPrev])

  if (total === 0) {
    return (
      <div className="text-center py-16 text-slate-500">
        Hələ slayd əlavə edilməyib.
      </div>
    )
  }

  const current = slides[index]

  if (!current) {
    return (
      <div className="text-center py-16 text-slate-500">
        Slayd tapılmadı.
      </div>
    )
  }

  const title = getSlideTitle(current)
  const type = getSlideType(current)
  const aciqlama = getMetafieldValue(current.metadata?.qisa_aciqlama)
  const catismazliqlar = getMetafieldValue(current.metadata?.catismazliqlar)
  const gorulecekIsler = getMetafieldValue(current.metadata?.gorulecek_isler)
  const neticeler = getMetafieldValue(current.metadata?.neticeler)
  const image = current.metadata?.slayd_sekli
  const dir = current.metadata?.istiqamet
  const dirTitle = dir ? getMetafieldValue(dir.metadata?.basliq) || dir.title : ''

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
          <span>
            Slayd {index + 1} / {total}
          </span>
          {dirTitle && (
            <span className="font-medium text-brand-700 truncate max-w-[200px]">
              {dirTitle}
            </span>
          )}
        </div>
        <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-600 rounded-full transition-all duration-300"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Slide card */}
      <div
        key={current.id}
        className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-fadeIn"
      >
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
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-balance mb-4">
            {title}
          </h2>
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

      {/* Navigation controls */}
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={goPrev}
          disabled={index === 0}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium hover:border-brand-300 hover:text-brand-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <span>←</span> Əvvəlki
        </button>

        <div className="hidden sm:flex items-center gap-1.5">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setIndex(i)}
              aria-label={`Slayd ${i + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i === index ? 'bg-brand-600 w-6' : 'bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

        <button
          onClick={goNext}
          disabled={index === total - 1}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-600 text-white font-medium hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Növbəti <span>→</span>
        </button>
      </div>
    </div>
  )
}