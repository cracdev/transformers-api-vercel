import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendSuccess, sendError, handleCors, rateLimit } from '../../lib/utils/response.js';
import { transformersService } from '../../lib/services/transformers.service.js';
import type { StatsResponse } from '../../lib/types/index.js';

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

    // Get stats
    const totalNames = transformersService.getTotalCount();
    
    const result: StatsResponse = {
      totalNames,
      apiVersion: 'v1',
    };

    sendSuccess(res, result, 'API statistics retrieved successfully');
  } catch (error) {
    console.error('Stats error:', error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    sendError(res, message, 500);
  }
}
