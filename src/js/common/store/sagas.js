import axios from 'axios';
import { call, put, select, all, takeLatest } from 'redux-saga/effects';
import { apiUrl, apiKey } from '../config/api.config';
import {
  actionTypes,
  setIsLoading,
  setResults,
  clearResults,
} from './actions';
import {
  querySelector,
  sortBySelector,
} from './selectors';

export function* searchByDirector() {
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
      return yield put(setIsLoading(false));
    }
  }
  yield put(clearResults());
  return yield put(setIsLoading(false));
}

export function* searchByTitle() {
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
    return yield put(setIsLoading(false));
  }
  yield put(clearResults());
  return yield put(setIsLoading(false));
}

export function* watchSearchByDirector() {
  yield takeLatest(actionTypes.SEARCH_BY_DIRECTOR, searchByDirector);
}

export function* watchSearchByTitle() {
  yield takeLatest(actionTypes.SEARCH_BY_TITLE, searchByTitle);
}

export default function* rootSaga() {
  yield all([
    watchSearchByDirector(),
    watchSearchByTitle(),
  ]);
}
