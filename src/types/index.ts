// ============================================================================
// Type Definitions
// ============================================================================

// Base API Response Types
interface BaseApiResponse<T> {
  success: boolean;
  resultCode: string;
  resultDescription: string;
  transactionId: string;
  data: T;
}

interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}
export type { BaseApiResponse, PaginatedResponse };
