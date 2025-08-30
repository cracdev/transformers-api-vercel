import { random, all } from '@cracdev/transformers-names';
import type { RandomNamesResponse } from '../types/index.js';

export class TransformersService {
  /**
   * Get random transformer names
   */
  public getRandomNames(count: number = 5): RandomNamesResponse {
    if (count <= 0 || count > 100) {
      throw new Error('Count must be between 1 and 100');
    }

    const names: string[] = [];
    for (let i = 0; i < count; i++) {
      names.push(random());
    }

    return {
      names,
      total: count,
    };
  }

  /**
   * Get all transformer names
   */
  public getAllNames(): string[] {
    return [...all];
  }

  /**
   * Get total count of available names
   */
  public getTotalCount(): number {
    return all.length;
  }

  /**
   * Search transformer names by query
   */
  public searchNames(query: string): string[] {
    if (!query || query.trim().length === 0) {
      return [];
    }

    const searchTerm = query.toLowerCase().trim();
    return all.filter(name => name.toLowerCase().includes(searchTerm));
  }
}

// Export singleton instance
export const transformersService = new TransformersService();
