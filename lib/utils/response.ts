import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { ApiResponse, ErrorResponse } from '../types/index.js';

export const sendSuccess = <T>(
  res: VercelResponse,
  data: T,
  message: string,
  statusCode: number = 200
): void => {
  const response: ApiResponse<T> = {
    status: 'SUCCESS',
    data,
    message,
    timestamp: new Date().toISOString(),
  };

  res.status(statusCode).json(response);
};

export const sendError = (
  res: VercelResponse,
  message: string,
  statusCode: number = 400,
  error?: string
): void => {
  const response: ErrorResponse = {
    status: 'ERROR',
    message,
    error,
    timestamp: new Date().toISOString(),
  };

  res.status(statusCode).json(response);
};

export const handleCors = (req: VercelRequest, res: VercelResponse): void => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
};

export const rateLimit = (() => {
  const requests = new Map<string, { count: number; resetTime: number }>();
  const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
  const MAX_REQUESTS = 100;

  return (req: VercelRequest, res: VercelResponse): boolean => {
    const ip = req.headers['x-forwarded-for'] as string || req.socket?.remoteAddress || 'unknown';
    const now = Date.now();
    const userRequests = requests.get(ip);

    if (!userRequests || now > userRequests.resetTime) {
      requests.set(ip, { count: 1, resetTime: now + WINDOW_MS });
      return true;
    }

    if (userRequests.count >= MAX_REQUESTS) {
      sendError(res, 'Too many requests, please try again later', 429);
      return false;
    }

    userRequests.count++;
    return true;
  };
})();
