import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Eén Markdown-bestand per project in src/content/projecten.
// De velden komen overeen met het formulier in Pages CMS (.pages.yml).
// Pages CMS kan lege velden als "" of null opslaan; vang dat netjes op.
const leeg = (v: unknown) => (v === '' || v === null ? undefined : v);
const lijst = (v: unknown) => (v == null || v === '' ? [] : Array.isArray(v) ? v.filter(Boolean) : [v]);

const projecten = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projecten' }),
  schema: z.object({
    titel: z.string(),
    plaats: z.string(),
    categorie: z.enum(['stucwerk', 'spuitwerk', 'wanden', 'sierpleister', 'renovatie']),
    opgeleverd: z.coerce.date(),
    uitgelicht: z.preprocess(leeg, z.boolean().default(false)),
    oppervlakte: z.preprocess(leeg, z.string().optional()),
    afwerking: z.preprocess(leeg, z.string().optional()),
    doorlooptijd: z.preprocess(leeg, z.string().optional()),
    opdrachtgever: z.preprocess(leeg, z.string().optional()),
    samenvatting: z.string(),
    omschrijving: z.preprocess(leeg, z.string().optional()),
    werkzaamheden: z.preprocess(lijst, z.array(z.string())),
    foto: z.string(),
    foto_alt: z.preprocess(leeg, z.string().default('')),
    foto_uitsnede: z.preprocess(leeg, z.enum(['boven', 'midden', 'onder']).default('midden')),
    extra_fotos: z.preprocess(lijst, z.array(z.string())),
    quote: z.preprocess(
      leeg,
      z.object({ tekst: z.preprocess(leeg, z.string().optional()), naam: z.preprocess(leeg, z.string().optional()) }).optional(),
    ),
  }),
});

export const collections = { projecten };
