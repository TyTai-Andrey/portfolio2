export interface FilterResult<T> {
  result: T[];
  total: number;
}

export interface GetAccountFilter {
  take?: number;
  skip?: number;
  search?: number;
}
