export interface ApiResponse<T = unknown> {
  status: 'SUCCESS' | 'ERROR';
  data?: T;
  message: string;
  timestamp?: string;
}

export interface RandomNamesResponse {
  names: string[];
  total: number;
}

export interface SearchResponse {
  names: string[];
  total: number;
  query: string;
}

export interface StatsResponse {
  totalNames: number;
  apiVersion: string;
}

export interface HealthResponse {
  status: 'UP' | 'DOWN';
  timestamp: string;
  version: string;
}

export interface ErrorResponse {
  status: 'ERROR';
  message: string;
  error?: string | undefined;
  timestamp: string;
}
