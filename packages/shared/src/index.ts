/** Shared, framework-neutral contracts belong in this package. */
export interface PaginatedResult<T> {
  items: T[];
  total: number;
}

