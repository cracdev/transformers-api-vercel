import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendSuccess, sendError, handleCors, rateLimit } from '../../lib/utils/response.js';
import type { HealthResponse } from '../../lib/types/index.js';

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

    const healthData: HealthResponse = {
      status: 'UP',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    };

    sendSuccess(res, healthData, 'Health check successful');
  } catch (error) {
    console.error('Health check error:', error);
    sendError(res, 'Internal server error', 500);
  }
}
