import axios from 'axios';
import { call, put, select, all, take, takeLatest } from 'redux-saga/effects';
import { apiUrl, apiKey } from '../config/api.config';
import {
  actionTypes,
  setIsLoading,
  setResults,
  clearResults,
  setIsError,
  setQuery,
  searchByDirector,
  setResultDetails,
} from './actions';
import {
  querySelector,
  sortBySelector,
} from './selectors';

export function* searchByDirectorSaga() {
  console.log('searchByDirectorSaga');
  try {
    yield put(setIsLoading(true));

    const query = yield select(querySelector);

    const res = yield call(
      axios.get,
      `${apiUrl}search/person`,
      {
        params: {
          query,
          api_key: apiKey,
        },
      },
    );
    console.log('searchByDirectorSaga res', res);

    if (res.data && res.data.results && res.data.results.length) {
      const res2 = yield call(
        axios.get,
        `${apiUrl}person/${res.data.results[0].id}`,
        {
          params: {
            append_to_response: 'movie_credits',
            api_key: apiKey,
          },
        },
      );

      if (res2.data && res2.data.movie_credits && res2.data.movie_credits.crew) {
        const films = res2.data.movie_credits.crew
          .filter(i => i.job === 'Director')
          .filter(i => !!i.title && !!i.release_date && !!i.poster_path)
          .map(i => ({ ...i, director: query }));

        const sortBy = yield select(sortBySelector);

        yield put(setResults(films, sortBy));
        yield put(setIsLoading(false));
        return;
      }
    }
    yield put(clearResults());
    yield put(setIsLoading(false));
  } catch (e) {
    yield put(clearResults());
    yield put(setIsLoading(false));
    yield put(setIsError(true));
  }
}

export function* searchByTitleSaga() {
  try {
    yield put(setIsLoading(true));

    const query = yield select(querySelector);

    const res = yield call(
      axios.get,
      `${apiUrl}search/movie`,
      {
        params: {
          query,
          api_key: apiKey,
        },
      },
    );

    if (res.data && res.data.results && res.data.results.length) {
      const films = res.data.results
        .filter(i => !!i.title && !!i.release_date && !!i.poster_path);

      const sortBy = yield select(sortBySelector);

      yield put(setResults(films, sortBy));
      yield put(setIsLoading(false));
      return;
    }
    yield put(clearResults());
    yield put(setIsLoading(false));
  } catch (e) {
    yield put(clearResults());
    yield put(setIsLoading(false));
    yield put(setIsError(true));
  }
}

export function* getFilmSaga(action) {
  console.log('getFilmSaga');
  const { id } = action;

  try {
    yield put(setIsLoading(true));

    const res = yield call(
      axios.get,
      `${apiUrl}movie/${id}`,
      {
        params: {
          api_key: apiKey,
          append_to_response: 'credits',
        },
      },
    );
    console.log('getFilmSaga res', res);

    yield put(setIsLoading(false)); // film is ready to be displayed without extra details

    if (res.data) {
      console.log('res.data');
      const film = res.data;
      yield put(setResults(film)); // intermediate, needed for SSR

      const { runtime } = res.data;
      const cast = (res.data.credits && res.data.credits.cast) || [];

      let directorObj;
      if (res.data.credits && res.data.credits.crew) {
        directorObj = res.data.credits.crew.find(i => i.job === 'Director');
      }

      if (directorObj && directorObj.name) {
        const director = directorObj.name;

        console.log('multiQuery');

        yield put(setQuery(director));
        yield put(searchByDirector());
        console.log('taking?');
        yield take(actionTypes.SET_RESULTS);
        console.log('took?');
        yield put(setResultDetails(film.id, { runtime, cast, director }));
        console.log('return');
        return;
      }
      // no director to search by, this film is the only film in the list
      film.cast = cast;
      film.genre_ids = res.data.genres && res.data.genres.length
        ? res.data.genres.map(i => i.id)
        : [];

      console.log('setResults');
      yield put(setResults(film));
    } else {
      console.log('clearResults');
      yield put(clearResults());
    }
  } catch (e) {
    console.log('clearResults');
    yield put(clearResults());
  }
}

export function* getFilmDetailsSaga(action) {
  const { film } = action;

  const res = yield call(
    axios.get,
    `${apiUrl}movie/${film.id}`,
    {
      params: {
        api_key: apiKey,
        append_to_response: 'credits',
      },
    },
  );

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

        yield put(setQuery(director));
        yield put(searchByDirector());
        yield take(actionTypes.SET_RESULTS);
        yield put(setResultDetails(film.id, { runtime, cast, director }));

        return;
      }
    }
    yield put(setResultDetails(film.id, { runtime, cast }));
  }
}

export function* watchSearchByDirector() {
  console.log('watchSearchByDirector');
  yield takeLatest(actionTypes.SEARCH_BY_DIRECTOR, searchByDirectorSaga);
}

export function* watchSearchByTitle() {
  yield takeLatest(actionTypes.SEARCH_BY_TITLE, searchByTitleSaga);
}

export function* watchGetFilm() {
  console.log('watchGetFilm');
  yield takeLatest(actionTypes.GET_FILM, getFilmSaga);
}

export function* watchGetFilmDetails() {
  yield takeLatest(actionTypes.GET_FILM_DETAILS, getFilmDetailsSaga);
}

export default function* rootSaga() {
  yield all([
    watchSearchByDirector(),
    watchSearchByTitle(),
    watchGetFilm(),
    watchGetFilmDetails(),
  ]);
}
