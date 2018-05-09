import axios from 'axios';
import { call, put, select, takeLatest, all } from 'redux-saga/effects';
import * as sut from 'common/store/sagas';
import * as actions from 'common/store/actions';
import * as selectors from 'common/store/selectors';
import { apiUrl, apiKey } from 'common/config/api.config';

describe('sagas', () => {
  describe('searchByDirector saga', () => {
    describe('happy path', () => {
      const gen = sut.searchByDirector();

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
      const gen = sut.searchByDirector();
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
      const gen = sut.searchByDirector();
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
  });

  describe('searchByTitle saga', () => {
    describe('happy path', () => {
      const gen = sut.searchByTitle();

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
      const gen = sut.searchByTitle();
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
  });

  describe('watchSearchByDirector saga', () => {
    it('should run a search by director saga on the latest corresponding action', () => {
      const gen = sut.watchSearchByDirector();
      expect(gen.next().value).toEqual(takeLatest(actions.actionTypes.SEARCH_BY_DIRECTOR, sut.searchByDirector));
    });
  });

  describe('watchSearchByTitle saga', () => {
    it('should run a search by title saga on the latest corresponding action', () => {
      const gen = sut.watchSearchByTitle();
      expect(gen.next().value).toEqual(takeLatest(actions.actionTypes.SEARCH_BY_TITLE, sut.searchByTitle));
    });
  });

  describe('root saga', () => {
    it('should initialize watching sagas', () => {
      const gen = sut.default();
      expect(gen.next().value).toEqual(all([
        sut.watchSearchByDirector(),
        sut.watchSearchByTitle(),
      ]));
    });
  });
});
