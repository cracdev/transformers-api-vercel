import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendSuccess, sendError, handleCors, rateLimit } from '../../lib/utils/response.js';
import { randomQuerySchema } from '../../lib/utils/validation.js';
import { transformersService } from '../../lib/services/transformers.service.js';

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
    const validationResult = randomQuerySchema.safeParse(req.query);
    if (!validationResult.success) {
      sendError(res, validationResult.error.issues[0]?.message || 'Invalid parameters', 400);
      return;
    }

    const { count } = validationResult.data;

    // Get random names
    const result = transformersService.getRandomNames(count);
    
    sendSuccess(
      res, 
      result, 
      `Retrieved ${count} random transformer name${count === 1 ? '' : 's'}`
    );
  } catch (error) {
    console.error('Random names error:', error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    sendError(res, message, 500);
  }
}
