// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at: string;
  modified_at: string;
}

// File/media metafield shape
export interface CosmicFile {
  url: string;
  imgix_url: string;
}

// Slide type literals
export type SlaydNovu = 'Başlıq' | 'Çatışmazlıq' | 'Yekun';

// Direction (İstiqamətlər)
export interface Istiqamet extends CosmicObject {
  type: 'istiqametler';
  metadata: {
    basliq?: string;
    tesvir?: string;
    ikon?: string;
    sira?: number;
  };
}

// Slide (Slaydlar)
export interface Slayd extends CosmicObject {
  type: 'slaydlar';
  metadata: {
    slayd_basligi?: string;
    slayd_novu?: SlaydNovu | { key: string; value: string };
    istiqamet?: Istiqamet;
    qisa_aciqlama?: string;
    catismazliqlar?: string;
    gorulecek_isler?: string;
    neticeler?: string;
    slayd_sekli?: CosmicFile | null;
    sira?: number;
  };
}

// API response type
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards
export function isIstiqamet(obj: CosmicObject): obj is Istiqamet {
  return obj.type === 'istiqametler';
}

export function isSlayd(obj: CosmicObject): obj is Slayd {
  return obj.type === 'slaydlar';
}