import * as sut from 'common/store/selectors';

describe('selectors', () => {
  const state = {
    common: {
      query: 'QUERY',
      results: [
        { id: 1, title: 'TITLE1' },
        { id: 2, title: 'TITLE2' },
        { id: 3, title: 'TITLE3' },
      ],
      searchBy: 'title',
      sortBy: 'rating',
      searchByParams: ['title', 'director'],
      sortByParams: ['release date', 'rating'],
      isLoading: false,
      isFilmLoading: true,
    },
  };

  const props = { match: { params: { id: 2 } } };

  describe('querySelector', () => {
    it('should select query string', () => {
      expect(sut.querySelector(state)).toBe('QUERY');
    });
  });

  describe('resultsSelector', () => {
    it('should select results', () => {
      expect(sut.resultsSelector(state)).toEqual([
        { id: 1, title: 'TITLE1' },
        { id: 2, title: 'TITLE2' },
        { id: 3, title: 'TITLE3' },
      ]);
    });
  });

  describe('searchBySelector', () => {
    it('should select searchBy parameter', () => {
      expect(sut.searchBySelector(state)).toBe('title');
    });
  });

  describe('sortBySelector', () => {
    it('should select sortBy parameter', () => {
      expect(sut.sortBySelector(state)).toBe('rating');
    });
  });

  describe('searchByParamsSelector', () => {
    it('should select searchBy parameters', () => {
      expect(sut.searchByParamsSelector(state)).toEqual(['title', 'director']);
    });
  });

  describe('sortByParamsSelector', () => {
    it('should select sortBy parameters', () => {
      expect(sut.sortByParamsSelector(state)).toEqual(['release date', 'rating']);
    });
  });

  describe('isLoadingSelector', () => {
    it('should select isLoading flag', () => {
      expect(sut.isLoadingSelector(state)).toBe(false);
    });
  });

  describe('isFilmLoadingSelector', () => {
    it('should select isFilmLoading flag', () => {
      expect(sut.isFilmLoadingSelector(state)).toBe(true);
    });
  });

  describe('filmSelector', () => {
    it('should select film based on the current route', () => {
      expect(sut.filmSelector(state, props)).toEqual({ id: 2, title: 'TITLE2' });
    });
  });

  describe('filteredResultsSelector', () => {
    it('should select results with the currently selected film filtered out', () => {
      expect(sut.filteredResultsSelector(state, props)).toEqual([
        { id: 1, title: 'TITLE1' },
        { id: 3, title: 'TITLE3' },
      ]);
    });
  });
});
