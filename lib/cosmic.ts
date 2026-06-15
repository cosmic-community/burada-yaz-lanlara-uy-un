import { createBucketClient } from '@cosmicjs/sdk'
import type { Istiqamet, Slayd } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Safely render any metafield value as a string
export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

// Sort helper for objects with metadata.sira
function bySira<T extends { metadata: { sira?: number } }>(a: T, b: T): number {
  const aSira = typeof a.metadata?.sira === 'number' ? a.metadata.sira : 9999
  const bSira = typeof b.metadata?.sira === 'number' ? b.metadata.sira : 9999
  return aSira - bSira
}

export async function getIstiqametler(): Promise<Istiqamet[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'istiqametler' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)

    const objects = response.objects as Istiqamet[]
    return objects.sort(bySira)
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('İstiqamətlər yüklənərkən xəta baş verdi')
  }
}

export async function getIstiqametBySlug(slug: string): Promise<Istiqamet | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'istiqametler', slug })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)

    return response.object as Istiqamet
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('İstiqamət yüklənərkən xəta baş verdi')
  }
}

export async function getSlaydlar(): Promise<Slayd[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'slaydlar' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)

    const objects = response.objects as Slayd[]
    return objects.sort(bySira)
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Slaydlar yüklənərkən xəta baş verdi')
  }
}

export async function getSlaydBySlug(slug: string): Promise<Slayd | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'slaydlar', slug })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)

    return response.object as Slayd
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Slayd yüklənərkən xəta baş verdi')
  }
}

export async function getSlaydlarByIstiqamet(istiqametId: string): Promise<Slayd[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'slaydlar', 'metadata.istiqamet': istiqametId })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)

    const objects = response.objects as Slayd[]
    return objects.sort(bySira)
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Slaydlar yüklənərkən xəta baş verdi')
  }
}