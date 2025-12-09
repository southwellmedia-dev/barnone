import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    client: z.string().optional(),
    location: z.string(),
    category: z.enum(["residential", "commercial", "industrial", "public"]),
    service: z.enum(["epoxy", "polishing", "staining", "repair", "multiple"]),
    sqft: z.string(),
    duration: z.string(),
    completedDate: z.string(),
    featured: z.boolean().default(false),
    coverImage: z.string(),
    gallery: z.array(z.string()),
    highlights: z.array(z.string()).optional(),
    testimonial: z
      .object({
        quote: z.string(),
        author: z.string(),
        role: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = { projects };
