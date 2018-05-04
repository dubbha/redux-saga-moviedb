import { actionTypes } from 'common/store/actions';
import { searchByParams, sortByParams, defaultSearchBy, defaultSortBy } from 'common/store/store.config';
import reducer from 'common/store/reducer';

describe('reducer', () => {
  it('should return initial state by default', () => {
    const action = { type: 'UNKNOWN_ACTION_TYPE' };
    expect(reducer(undefined, action)).toEqual({
      query: '',
      results: [],
      searchByParams,
      sortByParams,
      searchBy: defaultSearchBy,
      sortBy: defaultSortBy,
      isLoading: false,
      isFilmLoading: false,
    });
  });

  it('should set query', () => {
    const state = { query: '' };

    const action = {
      type: actionTypes.SET_QUERY,
      query: 'QUERY',
    };

    expect(reducer(state, action)).toEqual({ query: 'QUERY' });
  });

  it('should set results', () => {
    const state = { results: [] };

    const action = {
      type: actionTypes.SET_RESULTS,
      results: [{ id: 1 }, { id: 2 }, { id: 3 }],
    };

    expect(reducer(state, action)).toEqual({ results: [{ id: 1 }, { id: 2 }, { id: 3 }] });
  });

  it('should clear results', () => {
    const state = { results: [] };

    const action = {
      type: actionTypes.CLEAR_RESULTS,
    };

    expect(reducer(state, action)).toEqual({ results: [] });
  });

  it('should set details for the specific result', () => {
    const state = {
      results: [
        { id: 1, title: 'TITLE1', director: 'DERECTOR1' },
        { id: 2, title: 'TITLE2', director: 'DERECTOR2' },
        { id: 3, title: 'TITLE3', director: 'DERECTOR3' },
      ],
    };

    const action = {
      type: actionTypes.SET_RESULT_DETAILS,
      id: 2,
      details: { title: 'NEW_TITLE', director: 'NEW_DIRECTOR' },
    };

    expect(reducer(state, action)).toEqual({
      results: [
        { id: 1, title: 'TITLE1', director: 'DERECTOR1' },
        { id: 2, title: 'NEW_TITLE', director: 'NEW_DIRECTOR' },
        { id: 3, title: 'TITLE3', director: 'DERECTOR3' },
      ],
    });
  });

  it('should set searchBy parameter', () => {
    const state = { searchBy: 'title' };

    const action = {
      type: actionTypes.SET_SEARCH_BY,
      searchBy: 'director',
    };

    expect(reducer(state, action)).toEqual({ searchBy: 'director' });
  });

  it('should set sortBy parameter', () => {
    const state = { sortBy: 'release date' };

    const action = {
      type: actionTypes.SET_SORT_BY,
      sortBy: 'rating',
    };

    expect(reducer(state, action)).toEqual({ sortBy: 'rating' });
  });

  it('should set isLoading flag', () => {
    const state = { isLoading: false };

    const action = {
      type: actionTypes.SET_IS_LOADING,
      isLoading: true,
    };

    expect(reducer(state, action)).toEqual({ isLoading: true });
  });

  it('should set isFilmLoading flag', () => {
    const state = { isFilmLoading: false };

    const action = {
      type: actionTypes.SET_IS_FILM_LOADING,
      isFilmLoading: true,
    };

    expect(reducer(state, action)).toEqual({ isFilmLoading: true });
  });
});
