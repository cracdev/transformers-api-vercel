import { z } from 'zod';

export const randomQuerySchema = z.object({
  count: z
    .string()
    .optional()
    .default('5')
    .transform(val => {
      const num = parseInt(val, 10);
      if (isNaN(num) || num < 1 || num > 100) {
        throw new Error('Count must be between 1 and 100');
      }
      return num;
    }),
});

export const searchQuerySchema = z.object({
  q: z
    .string()
    .min(1, 'Search query cannot be empty')
    .max(100, 'Search query too long')
    .transform(val => val.trim()),
});

export type RandomQuery = z.infer<typeof randomQuerySchema>;
export type SearchQuery = z.infer<typeof searchQuerySchema>;
