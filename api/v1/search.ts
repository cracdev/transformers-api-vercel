import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendSuccess, sendError, handleCors, rateLimit } from '../../lib/utils/response.js';
import { searchQuerySchema } from '../../lib/utils/validation.js';
import { transformersService } from '../../lib/services/transformers.service.js';
import type { SearchResponse } from '../../lib/types/index.js';

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Handle CORS
    handleCors(req, res);
    
    // Apply rate limiting
    if (!rateLimit(req, res)) {
      return;
    }

    // Only allow GET requests
    if (req.method !== 'GET') {
      sendError(res, 'Method not allowed', 405);
      return;
    }

    // Validate query parameters
    const validationResult = searchQuerySchema.safeParse(req.query);
    if (!validationResult.success) {
      sendError(res, validationResult.error.issues[0]?.message || 'Invalid search query', 400);
      return;
    }

    const { q: query } = validationResult.data;

    // Search names
    const names = transformersService.searchNames(query);
    
    const result: SearchResponse = {
      names,
      total: names.length,
      query,
    };

    sendSuccess(
      res, 
      result, 
      `Found ${names.length} transformer name${names.length === 1 ? '' : 's'} matching "${query}"`
    );
  } catch (error) {
    console.error('Search error:', error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    sendError(res, message, 500);
  }
}
