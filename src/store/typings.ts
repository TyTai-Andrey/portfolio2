export type Nullable<T> = T | null | undefined;
export type DeleteIntersection<T, R> = Record<
  keyof Omit<T, keyof R>,
  undefined
>;
