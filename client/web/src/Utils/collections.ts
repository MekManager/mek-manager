/**
 * Finds the index of the last element in an array that matches the predicate
 * function.
 *
 * @param fn The predicate function
 * @param ls The list to find run the predicate function on.
 * @returns The last index found matching the predicate, or -1.
 */
export const findLastIndex = <T>(fn: (t: T) => boolean, ls: T[]): number => {
  const len = ls.length;
  let index = -1;
  let found = index;

  while (++index < len) {
    if (fn(ls[index])) {
      found = index;
    }
  }

  return found;
};
