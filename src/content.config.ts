import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const reads = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./content/reads" }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    type: z.enum(["book", "article", "blog"]),
    link: z.string().url(),
    tags: z.array(z.string()),
    blurb: z.string(),
    date_added: z.coerce.date(),
    recommendations: z.number().int().positive().default(1),
    recommended_by: z.array(z.string()).optional(),
    series: z.boolean().default(false),
  }),
});

export const collections = { reads };
