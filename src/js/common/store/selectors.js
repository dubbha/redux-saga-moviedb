import { createSelector } from 'reselect';

const commonStateSelector = state => state.common;

export const querySelector = createSelector(
  commonStateSelector,
  ({ query }) => query,
);

export const resultsSelector = createSelector(
  commonStateSelector,
  ({ results }) => results,
);

export const searchBySelector = createSelector(
  commonStateSelector,
  ({ searchBy }) => searchBy,
);

export const sortBySelector = createSelector(
  commonStateSelector,
  ({ sortBy }) => sortBy,
);

export const searchByParamsSelector = createSelector(
  commonStateSelector,
  ({ searchByParams }) => searchByParams,
);

export const sortByParamsSelector = createSelector(
  commonStateSelector,
  ({ sortByParams }) => sortByParams,
);

export const isLoadingSelector = createSelector(
  commonStateSelector,
  ({ isLoading }) => isLoading,
);

export const isFilmLoadingSelector = createSelector(
  commonStateSelector,
  ({ isFilmLoading }) => isFilmLoading,
);

const paramsIdSelector = (state, props) => +props.match.params.id;

export const filmSelector = createSelector(
  [resultsSelector, paramsIdSelector],
  (results, id) => results && id && results.find(item => item.id === id),
);

export const filteredResultsSelector = createSelector(
  [resultsSelector, paramsIdSelector],
  (results, id) =>
    results && id && results.filter(item => item.id !== id),
);
