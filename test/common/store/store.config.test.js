import { sortFnFabric } from 'common/store/store.config';

describe('store configuration', () => {
  describe('sortFnFabric', () => {
    it('should prepare a sorting function comparing API-specific property names', () => {
      expect(sortFnFabric('release date')(
        { release_date: '2013/01/01' },
        { release_date: '2000/12/31' },
      )).toBe(-1);
    });

    it('should reverse the result of the sorting on inputs reversal', () => {
      expect(sortFnFabric('release date')(
        { release_date: '2000/12/31' },
        { release_date: '2013/01/01' },
      )).toBe(1);
    });
  });
});
