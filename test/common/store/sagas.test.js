import axios from 'axios';
import { call, put, select, take, takeLatest, all } from 'redux-saga/effects';
import * as sut from 'common/store/sagas';
import * as actions from 'common/store/actions';
import * as selectors from 'common/store/selectors';
import { apiUrl, apiKey } from 'common/config/api.config';

describe('sagas', () => {
  describe('searchByDirectorSaga', () => {
    describe('happy path', () => {
      const gen = sut.searchByDirectorSaga();

      it('should set isLoading to true', () => {
        expect(gen.next().value).toEqual(put(actions.setIsLoading(true)));
      });

      it('should select the query', () => {
        expect(gen.next().value).toEqual(select(selectors.querySelector));
      });

      it('should call API for person', () => {
        expect(gen.next('query').value).toEqual(call(
          axios.get,
          `${apiUrl}search/person`,
          {
            params: {
              query: 'query',
              api_key: apiKey,
            },
          },
        ));
      });

      it('should call API for movie credits of the first person retrieved', () => {
        expect(gen.next({
          data: {
            results: [
              { id: 123 },
              { id: 456 },
              { id: 789 },
            ],
          },
        }).value).toEqual(call(
          axios.get,
          `${apiUrl}person/123`,
          {
            params: {
              append_to_response: 'movie_credits',
              api_key: apiKey,
            },
          },
        ));
      });

      it('should select sortBy if movie credits retrieved', () => {
        expect(gen.next({
          data: {
            movie_credits: {
              crew: [
                { job: 'Actor', title: 't2000', release_date: '2000', poster_path: 'p2000' },
                { job: 'Director', title: 'p2001', release_date: '2001', poster_path: 'p2001' },
                { job: 'Actor', title: 'p2002', release_date: '2002', poster_path: 'p2002' },
                { job: 'Director', title: 'p2003', release_date: '2003', poster_path: 'p2003' },
              ],
            },
          },
        }).value).toEqual(select(selectors.sortBySelector));
      });

      it('should set results to the list of the movies where the person is a director adding a director field', () => {
        expect(gen.next('sortByKey').value).toEqual(put(actions.setResults([
          { job: 'Director', title: 'p2001', release_date: '2001', poster_path: 'p2001', director: 'query' },
          { job: 'Director', title: 'p2003', release_date: '2003', poster_path: 'p2003', director: 'query' },
        ], 'sortByKey')));
      });

      it('should reset isLoading to false', () => {
        expect(gen.next().value).toEqual(put(actions.setIsLoading(false)));
      });

      it('should stop the happy path', () => {
        expect(gen.next()).toEqual({ value: undefined, done: true });
      });
    });

    describe('empty person query result', () => {
      const gen = sut.searchByDirectorSaga();
      gen.next();
      gen.next();
      gen.next();

      it('should clear search results on empty person query result', () => {
        expect(gen.next({
          data: {
            results: [],
          },
        }).value).toEqual(put(actions.clearResults()));
      });

      it('should reset isLoading to false on empty person query result', () => {
        expect(gen.next().value).toEqual(put(actions.setIsLoading(false)));
      });
    });

    describe('empty crew in movie credits query result', () => {
      const gen = sut.searchByDirectorSaga();
      gen.next();
      gen.next();
      gen.next();
      gen.next({
        data: {
          results: [
            { id: 123 },
          ],
        },
      });

      it('should clear search results', () => {
        expect(gen.next({
          data: {
            movie_credits: {},
          },
        }).value).toEqual(put(actions.clearResults()));
      });

      it('should reset isLoading to false', () => {
        expect(gen.next().value).toEqual(put(actions.setIsLoading(false)));
      });
    });

    describe('error handling', () => {
      const gen = sut.searchByDirectorSaga();
      gen.next();

      it('should clear results on error thrown', () => {
        expect(gen.throw('error').value).toEqual(put(actions.clearResults()));
      });

      it('should reset isLoading to false', () => {
        expect(gen.next().value).toEqual(put(actions.setIsLoading(false)));
      });

      it('should set isError to true', () => {
        expect(gen.next().value).toEqual(put(actions.setIsError(true)));
      });
    });
  });

  describe('searchByTitleSaga', () => {
    describe('happy path', () => {
      const gen = sut.searchByTitleSaga();

      it('should set isLoading to true', () => {
        expect(gen.next().value).toEqual(put(actions.setIsLoading(true)));
      });

      it('should select the query', () => {
        expect(gen.next().value).toEqual(select(selectors.querySelector));
      });

      it('should call API for movie', () => {
        expect(gen.next('query').value).toEqual(call(
          axios.get,
          `${apiUrl}search/movie`,
          {
            params: {
              query: 'query',
              api_key: apiKey,
            },
          },
        ));
      });

      it('should select sortBy if movies retrieved', () => {
        expect(gen.next({
          data: {
            results: [
              { title: 't2000', release_date: '2000', poster_path: 'p2000' },
              { title: 't2001', release_date: '2001' },
              { title: 't2002', release_date: '2002', poster_path: 'p2002' },
              { title: 't2002', poster_path: 'p2002' },
            ],
          },
        }).value).toEqual(select(selectors.sortBySelector));
      });

      it('should set results to the list of the movies with title, release data and poster', () => {
        expect(gen.next('sortByKey').value).toEqual(put(actions.setResults([
          { title: 't2000', release_date: '2000', poster_path: 'p2000' },
          { title: 't2002', release_date: '2002', poster_path: 'p2002' },
        ], 'sortByKey')));
      });

      it('should reset isLoading to false', () => {
        expect(gen.next().value).toEqual(put(actions.setIsLoading(false)));
      });

      it('should stop the happy path', () => {
        expect(gen.next()).toEqual({ value: undefined, done: true });
      });
    });

    describe('empty movies query result', () => {
      const gen = sut.searchByTitleSaga();
      gen.next();
      gen.next();
      gen.next();

      it('should clear search results', () => {
        expect(gen.next({
          data: {
            results: [],
          },
        }).value).toEqual(put(actions.clearResults()));
      });

      it('should reset isLoading to false', () => {
        expect(gen.next().value).toEqual(put(actions.setIsLoading(false)));
      });
    });

    describe('error handling', () => {
      const gen = sut.searchByTitleSaga();
      gen.next();

      it('should clear results on error thrown', () => {
        expect(gen.throw('error').value).toEqual(put(actions.clearResults()));
      });

      it('should reset isLoading to false', () => {
        expect(gen.next().value).toEqual(put(actions.setIsLoading(false)));
      });

      it('should set isError to true', () => {
        expect(gen.next().value).toEqual(put(actions.setIsError(true)));
      });
    });
  });

  describe('getFilmSaga', () => {
    describe('happy path', () => {
      const gen = sut.getFilmSaga({ id: 123 });

      it('should set isLoading to true', () => {
        expect(gen.next().value).toEqual(put(actions.setIsLoading(true)));
      });

      it('should call API for movie', () => {
        expect(gen.next().value).toEqual(call(
          axios.get,
          `${apiUrl}movie/123`,
          {
            params: {
              api_key: apiKey,
              append_to_response: 'credits',
            },
          },
        ));
      });

      it('should set isLoading to false', () => {
        expect(gen.next({
          data: {
            id: 123,
            runtime: 120,
            credits: {
              cast: ['Actor1', 'Actor2', 'Actor3'],
              crew: [
                { job: 'Actor', name: 'Johnny Depp' },
                { job: 'Director', name: 'Woody Allen' },
              ],
            },
          },
        }).value).toEqual(put(actions.setIsLoading(false)));
      });

      it('should set query to director name', () => {
        expect(gen.next().value).toEqual(put(actions.setQuery('Woody Allen')));
      });

      it('should search by director', () => {
        expect(gen.next().value).toEqual(call(sut.searchByDirectorSaga));
      });

      it('should set retult details with runtime, cast and director', () => {
        expect(gen.next().value).toEqual(put(actions.setResultDetails(123, {
          runtime: 120,
          cast: ['Actor1', 'Actor2', 'Actor3'],
          director: 'Woody Allen',
        })));
      });

      it('should stop the happy path', () => {
        expect(gen.next()).toEqual({ value: undefined, done: true });
      });
    });

    describe('no director to search by', () => {
      const gen = sut.getFilmSaga({ id: 123 });
      gen.next();
      gen.next();
      gen.next({
        data: {
          id: 123,
          runtime: 120,
          credits: {
            cast: ['Actor1', 'Actor2', 'Actor3'],
            crew: [
              { job: 'Actor', name: 'Johnny Depp' },
            ],
          },
          genres: [
            { id: 1, name: 'Drama' },
          ],
        },
      });

      expect(gen.next().value).toMatchObject(put(actions.setResults({
        id: 123,
        runtime: 120,
        cast: ['Actor1', 'Actor2', 'Actor3'],
        genre_ids: [1],
      })));
    });

    describe('empty response to movie request', () => {
      const gen = sut.getFilmSaga({ id: 123 });
      gen.next();
      gen.next();
      gen.next({});
      expect(gen.next().value).toEqual(put(actions.clearResults()));
    });

    describe('no cast, crew or genres in response to movie request', () => {
      const gen = sut.getFilmSaga({ id: 123 });
      gen.next();
      gen.next();
      gen.next({
        data: {
          id: 123,
          runtime: 120,
          credits: {},
        },
      });

      it('should set cast and genre ids to empty arrays', () => {
        expect(gen.next().value).toMatchObject(put(actions.setResults({
          id: 123,
          runtime: 120,
          cast: [],
          genre_ids: [],
        })));
      });
    });

    describe('error handling', () => {
      const gen = sut.getFilmSaga({ id: 123 });
      gen.next();

      it('should clear results on error thrown', () => {
        expect(gen.throw('error').value).toEqual(put(actions.clearResults()));
      });
    });
  });

  describe('getFilmDetailsSaga', () => {
    describe('no director passed in film object', () => {
      describe('no director received from server also', () => {
        const gen = sut.getFilmDetailsSaga({ film: { id: 123 } });

        it('should call API for movie', () => {
          expect(gen.next().value).toEqual(call(
            axios.get,
            `${apiUrl}movie/123`,
            {
              params: {
                api_key: apiKey,
                append_to_response: 'credits',
              },
            },
          ));
        });

        it('should set result details to runtime and cast', () => {
          expect(gen.next({
            data: {
              id: 123,
              runtime: 120,
              credits: {
                cast: ['Actor1', 'Actor2', 'Actor3'],
                crew: [
                  { job: 'Actor', name: 'Johnny Depp' },
                ],
              },
            },
          }).value).toEqual(put(actions.setResultDetails(123, { runtime: 120, cast: ['Actor1', 'Actor2', 'Actor3'] })));
        });
      });

      describe('no cast or crew in the server also', () => {
        const gen = sut.getFilmDetailsSaga({ film: { id: 123 } });

        it('should call API for movie', () => {
          expect(gen.next().value).toEqual(call(
            axios.get,
            `${apiUrl}movie/123`,
            {
              params: {
                api_key: apiKey,
                append_to_response: 'credits',
              },
            },
          ));
        });

        it('should set cast to empty array', () => {
          expect(gen.next({
            data: {
              id: 123,
              runtime: 120,
              credits: {},
            },
          }).value).toEqual(put(actions.setResultDetails(123, { runtime: 120, cast: [] })));
        });
      });

      describe('director received from server', () => {
        const gen = sut.getFilmDetailsSaga({ film: { id: 123 } });

        it('should call API for movie', () => {
          expect(gen.next().value).toEqual(call(
            axios.get,
            `${apiUrl}movie/123`,
            {
              params: {
                api_key: apiKey,
                append_to_response: 'credits',
              },
            },
          ));
        });

        it('should set query to director name', () => {
          expect(gen.next({
            data: {
              id: 123,
              runtime: 120,
              credits: {
                cast: ['Actor1', 'Actor2', 'Actor3'],
                crew: [
                  { job: 'Actor', name: 'Johnny Depp' },
                  { job: 'Director', name: 'Woody Allen' },
                ],
              },
            },
          }).value).toEqual(put(actions.setQuery('Woody Allen')));
        });

        it('should search by director', () => {
          expect(gen.next().value).toEqual(put(actions.searchByDirector()));
        });

        it('should wait for setResults action', () => {
          expect(gen.next().value).toEqual(take(actions.actionTypes.SET_RESULTS));
        });

        it('should set retult details with runtime, cast and director', () => {
          expect(gen.next().value).toEqual(put(actions.setResultDetails(123, {
            runtime: 120,
            cast: ['Actor1', 'Actor2', 'Actor3'],
            director: 'Woody Allen',
          })));
        });

        it('should stop', () => {
          expect(gen.next()).toEqual({ value: undefined, done: true });
        });
      });

      describe('no server response', () => {
        const gen = sut.getFilmDetailsSaga({ film: { id: 123 } });
        gen.next();

        it('should stop silently', () => {
          expect(gen.next({})).toEqual({ value: undefined, done: true });
        });
      });
    });

    describe('director passed in film object', () => {
      const gen = sut.getFilmDetailsSaga({ film: { id: 123, director: 'Quentin Tarantino' } });

      it('should call API for movie', () => {
        expect(gen.next().value).toEqual(call(
          axios.get,
          `${apiUrl}movie/123`,
          {
            params: {
              api_key: apiKey,
              append_to_response: 'credits',
            },
          },
        ));
      });

      it('should set result details to runtime and cast', () => {
        expect(gen.next({
          data: {
            id: 123,
            runtime: 120,
            credits: {
              cast: ['Actor1', 'Actor2', 'Actor3'],
              crew: [
                { job: 'Actor', name: 'Johnny Depp' },
              ],
            },
          },
        }).value).toEqual(put(actions.setResultDetails(123, { runtime: 120, cast: ['Actor1', 'Actor2', 'Actor3'] })));
      });
    });
  });

  describe('watchSearchByDirector saga', () => {
    it('should run a search by director saga on the latest corresponding action', () => {
      const gen = sut.watchSearchByDirector();
      expect(gen.next().value).toEqual(takeLatest(actions.actionTypes.SEARCH_BY_DIRECTOR, sut.searchByDirectorSaga));
    });
  });

  describe('watchSearchByTitle saga', () => {
    it('should run a search by title saga on the latest corresponding action', () => {
      const gen = sut.watchSearchByTitle();
      expect(gen.next().value).toEqual(takeLatest(actions.actionTypes.SEARCH_BY_TITLE, sut.searchByTitleSaga));
    });
  });

  describe('watchGetFilm saga', () => {
    it('should run a get film saga on the latest corresponding action', () => {
      const gen = sut.watchGetFilm();
      expect(gen.next().value).toEqual(takeLatest(actions.actionTypes.GET_FILM, sut.getFilmSaga));
    });
  });

  describe('watchGetFilmDetails saga', () => {
    it('should run a get film details saga on the latest corresponding action', () => {
      const gen = sut.watchGetFilmDetails();
      expect(gen.next().value).toEqual(takeLatest(actions.actionTypes.GET_FILM_DETAILS, sut.getFilmDetailsSaga));
    });
  });

  describe('root saga', () => {
    it('should initialize watching sagas', () => {
      const gen = sut.default();
      expect(gen.next().value).toEqual(all([
        sut.watchSearchByDirector(),
        sut.watchSearchByTitle(),
        sut.watchGetFilm(),
        sut.watchGetFilmDetails(),
      ]));
    });
  });
});
