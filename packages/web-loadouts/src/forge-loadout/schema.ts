import { z } from "zod";

export const schema = z.object({
  name: z
    .string()
    .min(6, "A name has to be greater than 6 characters")
    .max(24, "A name has to be less than 24 characters"),
  weapon: z.string().refine((x) => x !== "default", {
    message: "A loadout without a weapon?",
  }),
  selected: z
    .array(
      z.object({
        id: z.string().optional(),
      })
    )
    .default([]),
});

const apiSchema = z.object({
  name: z.string().min(6).max(24),
  weapon: z.number(),
  selected: z.array(z.number()),
});

export type ForgeLoadoutDto = z.infer<typeof apiSchema>;
