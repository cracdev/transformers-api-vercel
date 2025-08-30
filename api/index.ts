import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendSuccess, handleCors, rateLimit } from '../lib/utils/response.js';

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Handle CORS
    handleCors(req, res);
    
    // Apply rate limiting
    if (!rateLimit(req, res)) {
      return;
    }

    const apiInfo = {
      name: 'Transformers API',
      version: '1.0.0',
      description: 'Modern API for Transformers character names (1984-2011)',
      apiVersion: 'v1',
      endpoints: {
        health: '/api/v1/health',
        random: '/api/v1/random?count=5',
        search: '/api/v1/search?q=optimus',
        all: '/api/v1/all',
        stats: '/api/v1/stats',
      },
      documentation: 'https://github.com/your-repo/transformers-api',
    };

    sendSuccess(res, apiInfo, 'Transformers API is running on Vercel!');
  } catch (error) {
    console.error('API info error:', error);
    res.status(500).json({
      status: 'ERROR',
      message: 'Internal server error',
      timestamp: new Date().toISOString(),
    });
  }
}
