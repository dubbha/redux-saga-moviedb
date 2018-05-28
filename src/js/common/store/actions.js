import { defaultSortBy, sortFnFabric } from './store.config';

export const actionTypes = {
  SET_QUERY: 'SET_QUERY',
  SET_RESULTS: 'SET_RESULTS',
  CLEAR_RESULTS: 'CLEAR_RESULTS',
  SET_RESULT_DETAILS: 'SET_RESULT_DETAILS',
  SET_SEARCH_BY: 'SET_SEARCH_BY',
  SET_SORT_BY: 'SET_SORT_BY',
  SET_IS_LOADING: 'SET_IS_LOADING',
  SET_IS_FILM_LOADING: 'SET_IS_FILM_LOADING',
  SET_IS_ERROR: 'SET_IS_ERROR',
  SEARCH_BY_DIRECTOR: 'SEARCH_BY_DIRECTOR',
  SEARCH_BY_TITLE: 'SEARCH_BY_TITLE',
  GET_FILM: 'GET_FILM',
  GET_FILM_DETAILS: 'GET_FILM_DETAILS',
};

export const setQuery = query => ({
  type: actionTypes.SET_QUERY,
  query,
});

export const setResults = (results, sortBy = defaultSortBy) => ({
  type: actionTypes.SET_RESULTS,
  results: Array.isArray(results) ? [...results.sort(sortFnFabric(sortBy))] : [results],
});

export const clearResults = () => ({
  type: actionTypes.CLEAR_RESULTS,
});

export const setResultDetails = (id, details) => ({
  type: actionTypes.SET_RESULT_DETAILS,
  id,
  details,
});

export const setSearchBy = searchBy => ({
  type: actionTypes.SET_SEARCH_BY,
  searchBy,
});

export const setSortBy = sortBy => ({
  type: actionTypes.SET_SORT_BY,
  sortBy,
});

export const setIsLoading = isLoading => ({
  type: actionTypes.SET_IS_LOADING,
  isLoading,
});

export const setIsFilmLoading = isFilmLoading => ({
  type: actionTypes.SET_IS_FILM_LOADING,
  isFilmLoading,
});

export const setIsError = isError => ({
  type: actionTypes.SET_IS_ERROR,
  isError,
});

export const searchByDirector = () => ({
  type: actionTypes.SEARCH_BY_DIRECTOR,
});

export const searchByTitle = () => ({
  type: actionTypes.SEARCH_BY_TITLE,
});

export const getFilm = (id) => {
  console.log('getFilm action');
  return ({
    type: actionTypes.GET_FILM,
    id,
  });
};

export const getFilmDetails = film => ({
  type: actionTypes.GET_FILM_DETAILS,
  film,
});
