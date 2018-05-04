import axios from 'axios';
import { defaultSortBy, sortFnFabric } from './store.config';
import { apiUrl, apiKey } from '../config/api.config';

export const actionTypes = {
  SET_QUERY: 'SET_QUERY',
  SET_RESULTS: 'SET_RESULTS',
  CLEAR_RESULTS: 'CLEAR_RESULTS',
  SET_RESULT_DETAILS: 'SET_RESULT_DETAILS',
  SET_SEARCH_BY: 'SET_SEARCH_BY',
  SET_SORT_BY: 'SET_SORT_BY',
  SET_IS_LOADING: 'SET_IS_LOADING',
  SET_IS_FILM_LOADING: 'SET_IS_FILM_LOADING',
};

export const setQuery = query => ({
  type: actionTypes.SET_QUERY,
  query,
});

export const setResults = (results, sortBy = defaultSortBy) => ({
  type: actionTypes.SET_RESULTS,
  results: Array.isArray(results) ? results.sort(sortFnFabric(sortBy)) : [results],
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

export const searchByDirector = (query, sortBy = defaultSortBy) => (dispatch) => {
  dispatch(setIsLoading(true));

  return axios.get(
    `${apiUrl}search/person`,
    {
      params: {
        query,
        api_key: apiKey,
      },
    },
  ).then((res) => {
    if (res.data && res.data.results && res.data.results.length) {
      return axios.get(
        `${apiUrl}person/${res.data.results[0].id}`,
        {
          params: {
            append_to_response: 'movie_credits',
            api_key: apiKey,
          },
        },
      ).then((res2) => {
        if (res2.data && res2.data.movie_credits && res2.data.movie_credits.crew) {
          const films = res2.data.movie_credits.crew
            .filter(i => i.job === 'Director')
            .filter(i => !!i.title && !!i.release_date && !!i.poster_path)
            .map(i => ({ ...i, director: query }));

          dispatch(setIsLoading(false));
          dispatch(setResults(films, sortBy));
          return true;
        }
        return Promise.reject(res2);
      });
    }
    return Promise.reject(res);
  }).catch(() => {
    dispatch(clearResults());
    dispatch(setIsLoading(false));
  });
};

export const searchByTitle = (query, sortBy = defaultSortBy) => (dispatch) => {
  dispatch(setIsLoading(true));

  return axios.get(
    `${apiUrl}search/movie`,
    {
      params: {
        query,
        api_key: apiKey,
      },
    },
  ).then((res) => {
    if (res.data && res.data.results && res.data.results.length) {
      const films = res.data.results
        .filter(i => !!i.title && !!i.release_date && !!i.poster_path);

      dispatch(setResults(films, sortBy));
      dispatch(setIsLoading(false));
      return true;
    }
    return Promise.reject(res);
  }).catch(() => {
    dispatch(clearResults());
    dispatch(setIsLoading(false));
  });
};

export const getFilm = id => (dispatch) => {
  dispatch(setIsLoading(true));

  return axios.get(
    `${apiUrl}movie/${id}`,
    {
      params: {
        api_key: apiKey,
        append_to_response: 'credits',
      },
    },
  ).then((res) => {
    dispatch(setIsLoading(false)); // film is ready to be displayed without extra details

    if (res.data) {
      const film = res.data;

      const { runtime } = res.data;
      const cast = (res.data.credits && res.data.credits.cast) || [];

      let directorObj;
      if (res.data.credits && res.data.credits.crew) {
        directorObj = res.data.credits.crew.find(i => i.job === 'Director');
      }

      if (directorObj && directorObj.name) {
        const director = directorObj.name;
        return searchByDirector(director)(dispatch)
          .then(() => {
            dispatch(setResultDetails(id, { runtime, cast, director }));
          });
      }
      // no director to search by, this film is the only film in the list
      film.cast = cast;
      film.genre_ids = res.data.genres && res.data.genres.length
        ? res.data.genres.map(i => i.id)
        : [];

      dispatch(setResults(film));
    }
    return Promise.reject();
  }).catch(() => dispatch(clearResults()));
};

export const getFilmDetails = film => dispatch =>
  axios.get(
    `${apiUrl}movie/${film.id}`,
    {
      params: {
        api_key: apiKey,
        append_to_response: 'credits',
      },
    },
  ).then((res) => {
    if (res.data) {
      const { runtime } = res.data;
      const cast = (res.data.credits && res.data.credits.cast) || [];

      if (!film.director) {
        let directorObj;
        if (res.data.credits && res.data.credits.crew) {
          directorObj = res.data.credits.crew.find(i => i.job === 'Director');
        }

        if (directorObj && directorObj.name) { // some movies have no director
          const director = directorObj.name;

          return searchByDirector(director)(dispatch)
            .then(() => {
              dispatch(setResultDetails(film.id, { runtime, cast, director }));
            });
        }
        dispatch(setResultDetails(film.id, { runtime, cast }));
      } else {
        dispatch(setResultDetails(film.id, { runtime, cast }));
      }
    }
    return true;
  }).catch(() => {}); // catch silently
