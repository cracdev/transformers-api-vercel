import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendSuccess, sendError, handleCors, rateLimit } from '../../lib/utils/response.js';
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

    // Get all names
    const names = transformersService.getAllNames();
    
    const result = {
      names,
      total: names.length,
    };

    sendSuccess(res, result, `Retrieved all ${names.length} transformer names`);
  } catch (error) {
    console.error('Get all names error:', error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    sendError(res, message, 500);
  }
}
