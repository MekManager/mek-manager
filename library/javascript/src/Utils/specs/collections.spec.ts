import { expect } from 'chai';
import 'mocha';
import { findLastIndex } from '../collections';

describe('Collection utility functions', () => {
  describe('findLastIndex', () => {
    it('should find the last index in a simple array', () => {
      const sample: number[] = [1, 2, 3, 3, 4];
      const predicate = (x: number) => x === 3;

      expect(findLastIndex(predicate, sample)).to.equal(3);
    });

    it('should find the last index in an array of objects', () => {
      const sample: { id: number, a: string }[] = [
        { id: 1, a: 'cool' },
        { id: 2, a: 'foo' },
        { id: 3, a: 'bar' },
        { id: 1, a: 'baz' },
        { id: 5, a: 'qax' },
      ];
      const predicate = (x: { id: number, a: string }) => x.id > 2;
      expect(findLastIndex(predicate, sample)).to.equal(4);
    });
  });
});
