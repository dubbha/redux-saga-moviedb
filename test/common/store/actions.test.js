import * as sut from 'common/store/actions';

jest.mock('common/store/store.config', () => ({
  defaultSortBy: 'id',
  sortFnFabric: sortBy => (a, b) => (b[sortBy] > a[sortBy] ? 1 : -1),
}));

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve()),
}));

jest.mock('common/config/api.config', () => ({
  apiUrl: 'https://API_URL/',
  apiKey: 'API_KEY',
}));


describe('actions', () => {
  describe('setQuery action', () => {
    it('should set query', () => {
      expect(sut.setQuery('QUERY')).toEqual({
        type: sut.actionTypes.SET_QUERY,
        query: 'QUERY',
      });
    });
  });

  describe('setResults action', () => {
    it('should set results with default sorting', () => {
      expect(sut.setResults([{ id: 1 }, { id: 3 }, { id: 2 }])).toEqual({
        type: sut.actionTypes.SET_RESULTS,
        results: [{ id: 3 }, { id: 2 }, { id: 1 }],
      });
    });

    it('should sort results by the passed prop instead if available', () => {
      expect(sut.setResults([{ id: 1, title: 'b' }, { id: 3, title: 'c' }, { id: 2, title: 'a' }], 'title'))
        .toEqual({
          type: sut.actionTypes.SET_RESULTS,
          results: [{ id: 3, title: 'c' }, { id: 1, title: 'b' }, { id: 2, title: 'a' }],
        });
    });

    it('should wrap to an array if a single result was passed', () => {
      expect(sut.setResults({ id: 2 })).toEqual({
        type: sut.actionTypes.SET_RESULTS,
        results: [{ id: 2 }],
      });
    });
  });

  describe('clearResults action', () => {
    it('should clear resuts', () => {
      expect(sut.clearResults()).toEqual({
        type: sut.actionTypes.CLEAR_RESULTS,
      });
    });
  });

  describe('setResultDetails action', () => {
    it('should details for a specific result', () => {
      expect(sut.setResultDetails(2, { title: 'NEW_TITLE' })).toEqual({
        type: sut.actionTypes.SET_RESULT_DETAILS,
        id: 2,
        details: { title: 'NEW_TITLE' },
      });
    });
  });

  describe('setResultDetails action', () => {
    it('should details for a specific result', () => {
      expect(sut.setResultDetails(2, { title: 'NEW_TITLE' })).toEqual({
        type: sut.actionTypes.SET_RESULT_DETAILS,
        id: 2,
        details: { title: 'NEW_TITLE' },
      });
    });
  });

  describe('setSearchBy action', () => {
    it('should set setSearchBy parameter', () => {
      expect(sut.setSearchBy('SEARCH_BY_PARAM')).toEqual({
        type: sut.actionTypes.SET_SEARCH_BY,
        searchBy: 'SEARCH_BY_PARAM',
      });
    });
  });

  describe('setSortBy action', () => {
    it('should set setSortBy parameter', () => {
      expect(sut.setSortBy('SORT_BY_PARAM')).toEqual({
        type: sut.actionTypes.SET_SORT_BY,
        sortBy: 'SORT_BY_PARAM',
      });
    });
  });

  describe('setIsLoading action', () => {
    it('should set setIsLoading parameter', () => {
      expect(sut.setIsLoading(true)).toEqual({
        type: sut.actionTypes.SET_IS_LOADING,
        isLoading: true,
      });
    });
  });

  describe('setIsFilmLoading action', () => {
    it('should set setIsFilmLoading parameter', () => {
      expect(sut.setIsFilmLoading(true)).toEqual({
        type: sut.actionTypes.SET_IS_FILM_LOADING,
        isFilmLoading: true,
      });
    });
  });

  describe('setIsError action', () => {
    it('should set setIsError parameter', () => {
      expect(sut.setIsError(true)).toEqual({
        type: sut.actionTypes.SET_IS_ERROR,
        isError: true,
      });
    });
  });

  describe('searchByDirector action', () => {
    it('should initialize a search by director', () => {
      expect(sut.searchByDirector()).toEqual({
        type: sut.actionTypes.SEARCH_BY_DIRECTOR,
      });
    });
  });

  describe('searchByTitle action', () => {
    it('should initialize a search by title', () => {
      expect(sut.searchByTitle(true)).toEqual({
        type: sut.actionTypes.SEARCH_BY_TITLE,
      });
    });
  });

  describe('getFilm action', () => {
    it('should get film by id', () => {
      expect(sut.getFilm(42)).toEqual({
        type: sut.actionTypes.GET_FILM,
        id: 42,
      });
    });
  });

  describe('getFilmDetails action', () => {
    it('should get film details based on the current film object', () => {
      expect(sut.getFilmDetails({ id: 42, director: 'Director' })).toEqual({
        type: sut.actionTypes.GET_FILM_DETAILS,
        film: {
          id: 42,
          director: 'Director',
        },
      });
    });
  });
});
