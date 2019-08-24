export function arrayIntersection(array1: any[], array2: any[]): any[] {
  return array1.filter(value => array2.includes(value));
}

export function arrayIntersectionAny(array1: any[], array2: any[]): boolean {
  return arrayIntersection(array1, array2).length > 0;
}
