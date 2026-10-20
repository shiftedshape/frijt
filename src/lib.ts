import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projecten'>;

export const CATEGORIEEN: Record<string, string> = {
  stucwerk: 'Stucwerk',
  spuitwerk: 'Spuitwerk',
  wanden: 'Wanden & plafonds',
  sierpleister: 'Sierpleister',
  renovatie: 'Renovatie',
};

export const UITSNEDE: Record<string, string> = {
  boven: '50% 25%',
  midden: '50% 50%',
  onder: '50% 70%',
};

/** Alle projecten, nieuwste oplevering eerst. */
export async function alleProjecten(): Promise<Project[]> {
  const items = await getCollection('projecten');
  return items.sort((a, b) => b.data.opgeleverd.getTime() - a.data.opgeleverd.getTime());
}

/** Tekst met lege regels ertussen omzetten naar alinea's. */
export function alineas(tekst = ''): string[] {
  return tekst.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
}

/** Fotopad uit het CMS altijd als /uploads/... teruggeven. */
export function fotoUrl(pad = ''): string {
  if (!pad) return '';
  if (/^https?:\/\//.test(pad)) return pad;
  return pad.startsWith('/') ? pad : '/' + pad.replace(/^public\//, '');
}
