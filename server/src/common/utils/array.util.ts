export function arrayIntersection<T>(array1: T[], array2: T[]): T[] {
  return array1.filter(value => array2.includes(value));
}

export function arrayIntersectionAny<T>(array1: T[], array2: T[]): boolean {
  return arrayIntersection(array1, array2).length > 0;
}
