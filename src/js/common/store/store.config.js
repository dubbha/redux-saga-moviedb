export const searchByParams = ['title', 'director'];
export const sortByParams = ['release date', 'rating'];

export const defaultSearchBy = searchByParams[1];
export const defaultSortBy = sortByParams[0];

const sortByApiMap = {
  'release date': 'release_date',
  rating: 'vote_average',
};

export const sortFnFabric = sortBy =>
  (a, b) => (b[sortByApiMap[sortBy]] > a[sortByApiMap[sortBy]] ? 1 : -1);
