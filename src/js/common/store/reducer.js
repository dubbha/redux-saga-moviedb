import { actionTypes } from './actions';
import { searchByParams, sortByParams, defaultSearchBy, defaultSortBy } from './store.config';

const initialState = {
  query: '',
  results: [],
  searchByParams,
  sortByParams,
  searchBy: defaultSearchBy,
  sortBy: defaultSortBy,
  isLoading: false,
  isFilmLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_QUERY:
      return {
        ...state,
        query: action.query,
      };
    case actionTypes.SET_RESULTS:
      return {
        ...state,
        results: action.results,
      };
    case actionTypes.CLEAR_RESULTS:
      return {
        ...state,
        results: [],
      };
    case actionTypes.SET_RESULT_DETAILS:
      return {
        ...state,
        results: state.results
          .map(i => (i.id === action.id ? { ...i, ...action.details } : i)),
      };
    case actionTypes.SET_SEARCH_BY:
      return {
        ...state,
        searchBy: action.searchBy,
      };
    case actionTypes.SET_SORT_BY:
      return {
        ...state,
        sortBy: action.sortBy,
      };
    case actionTypes.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case actionTypes.SET_IS_FILM_LOADING:
      return {
        ...state,
        isFilmLoading: action.isFilmLoading,
      };
    default:
      return state;
  }
};

export default reducer;

