import { getMetafieldValue } from '@/lib/cosmic'
import type { Slayd, Istiqamet } from '@/types'

const ICON_MAP: Record<string, string> = {
  istiqamet: '🎯',
  tedris: '📚',
  normativ: '📋',
  idareetme: '⚙️',
  imtahan: '✍️',
  kargüzarliq: '🗂️',
  default: '🔹',
}

export function getDirectionIcon(istiqamet: Istiqamet | undefined): string {
  if (!istiqamet) return ICON_MAP.default
  const raw = getMetafieldValue(istiqamet.metadata?.ikon).trim()
  if (raw) {
    // If emoji or short text, use directly
    if (raw.length <= 4) return raw
    const key = raw.toLowerCase()
    return ICON_MAP[key] ?? ICON_MAP.default
  }
  return ICON_MAP.default
}

export function getSlideTitle(slayd: Slayd): string {
  const heading = getMetafieldValue(slayd.metadata?.slayd_basligi)
  return heading || slayd.title
}

export function getSlideType(slayd: Slayd): string {
  return getMetafieldValue(slayd.metadata?.slayd_novu)
}

export function groupSlidesByDirection(
  slides: Slayd[]
): { istiqamet: Istiqamet | null; slides: Slayd[] }[] {
  const map = new Map<string, { istiqamet: Istiqamet | null; slides: Slayd[] }>()
  const noDirection: Slayd[] = []

  for (const slide of slides) {
    const dir = slide.metadata?.istiqamet
    if (dir && dir.id) {
      const existing = map.get(dir.id)
      if (existing) {
        existing.slides.push(slide)
      } else {
        map.set(dir.id, { istiqamet: dir, slides: [slide] })
      }
    } else {
      noDirection.push(slide)
    }
  }

  const result = Array.from(map.values())
  if (noDirection.length > 0) {
    result.push({ istiqamet: null, slides: noDirection })
  }
  return result
}