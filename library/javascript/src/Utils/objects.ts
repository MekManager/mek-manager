/**
 * Creates a deep copy of a given complex data type (objects, arrays, etc).
 * This approach is both slightly faster and more general than `Object.assign`.
 *
 * @param subject some object to be copied
 * @returns a deep copy of `subject`.
 */
export const deepCopy = <T>(subject: T): T => {
  return JSON.parse(JSON.stringify(subject)) as T;
};
