import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { connect } from 'react-redux';
import { Film } from 'film/Film';

jest.mock('react-redux', () => ({
  connect: jest.fn(() => jest.fn()),
}));

jest.mock('common/store/selectors', () => ({
  filmSelector: jest.fn((state, props) => state.results.find(i => i.id === +props.match.params.id)),
  filteredResultsSelector: jest.fn((state, props) => state.results.filter(i => i.id !== +props.match.params.id)),
  isLoadingSelector: jest.fn(state => state.isLoading),
  isFilmLoadingSelector: jest.fn(state => state.isFilmLoading),
}));

jest.mock('common/store/actions', () => ({
  getFilm: jest.fn(id => `film with id ${id}`),
}));

describe('Film', () => {
  describe('react-redux connector', () => {
    it('should map state to props', () => {
      const mapStateToProps = connect.mock.calls[0][0];

      const state = {
        isLoading: false,
        isFilmLoading: false,
        results: [
          { id: 1, title: 'TITLE1' },
          { id: 2, title: 'TITLE2' },
          { id: 3, title: 'TITLE3' },
        ],
      };

      const props = {
        match: {
          params: { id: '1' },
        },
      };

      expect(mapStateToProps(state, props)).toEqual({
        film: { id: 1, title: 'TITLE1' },
        filteredResults: [
          { id: 2, title: 'TITLE2' },
          { id: 3, title: 'TITLE3' },
        ],
        isLoading: false,
        isFilmLoading: false,
      });
    });
  });

  describe('unconnected component', () => {
    let props;
    beforeEach(() => {
      props = {
        match: { params: { id: '1', title: 'TITLE' } },
        history: { push: jest.fn() },
        film: {
          id: 1,
          title: 'TITLE',
          runtime: 120,
          director: 'DIRECTOR',
          cast: [
            { character: 'CHARACTER1', name: 'NAME1' },
            { character: 'CHARACTER2', name: 'NAME2' },
          ],
        },
        filteredResults: [
          { id: 2, title: 'TITLE2' },
          { id: 3, title: 'TITLE3' },
        ],
        getFilm: jest.fn(),
        getFilmDetails: jest.fn(),
        searchByDirector: jest.fn(),
        setSearchBy: jest.fn(),
        isLoading: false,
        isFilmLoading: false,
      };
    });

    it('should render successfully', () => {
      const wrapper = shallow(<Film {...props} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should not render result block if film is loading', () => {
      const wrapper = shallow(<Film {...props} isFilmLoading />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should not render film header and result blocks if film is not available', () => {
      const wrapper = shallow(<Film {...props} film={null} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should get film if film is not available on mount', () => {
      props.film = null;
      const instance = new Film(props);

      instance.componentWillMount();

      expect(props.getFilm).toBeCalled();
    });

    it('should get film details if runtime is not available on mount', () => {
      props.film.runtime = null;
      const instance = new Film(props);

      instance.componentWillMount();

      expect(props.getFilmDetails).toBeCalled();
    });

    it('should get film details if cast runtime is not available on mount', () => {
      props.film.cast = null;
      const instance = new Film(props);

      instance.componentWillMount();

      expect(props.getFilmDetails).toBeCalled();
    });

    it('should get film details if director is not available on mount', () => {
      props.film.director = null;
      const instance = new Film(props);

      instance.componentWillMount();

      expect(props.getFilmDetails).toBeCalled();
    });

    it('should search by director if film director is available but results are empty on mount', () => {
      props.film = { id: 1, title: 'TITLE', director: 'DIRECTOR' };
      props.filteredResults = [];
      const instance = new Film(props);

      instance.componentWillMount();

      expect(props.searchByDirector).toBeCalled();
    });

    it('should get film if route id param changed but film is not available on props change', () => {
      const instance = new Film(props);

      instance.componentWillReceiveProps({
        match: { params: { id: '2', title: 'TITLE2' } },
        film: null,
      });

      expect(props.getFilm).toBeCalled();
    });

    it('should get film details if route id param changed but film runtime is not available on props change', () => {
      const instance = new Film(props);

      instance.componentWillReceiveProps({
        match: { params: { id: '2', title: 'TITLE2' } },
        film: {
          id: 2,
          title: 'TITLE2',
          director: 'DIRECTOR',
          cast: [
            { character: 'CHARACTER1', name: 'NAME1' },
            { character: 'CHARACTER2', name: 'NAME2' },
          ],
        },
      });

      expect(props.getFilmDetails).toBeCalled();
    });

    it('should get film details if route id param changed but film cast is not available on props change', () => {
      const instance = new Film(props);

      instance.componentWillReceiveProps({
        match: { params: { id: '2', title: 'TITLE2' } },
        film: {
          id: 2,
          title: 'TITLE2',
          runtime: 120,
          director: 'DIRECTOR',
        },
      });

      expect(props.getFilmDetails).toBeCalled();
    });

    it('should get film details if route id param changed but film director is not available on props change', () => {
      const instance = new Film(props);

      instance.componentWillReceiveProps({
        match: { params: { id: '2', title: 'TITLE2' } },
        film: {
          id: 2,
          title: 'TITLE2',
          runtime: 120,
          cast: [
            { character: 'CHARACTER1', name: 'NAME1' },
            { character: 'CHARACTER2', name: 'NAME2' },
          ],
        },
      });

      expect(props.getFilmDetails).toBeCalled();
    });

    it('should not get film if route id param has not changed on props change', () => {
      const instance = new Film(props);

      instance.componentWillReceiveProps({
        match: { params: { id: '1', title: 'TITLE' } },
        film: null,
      });

      expect(props.getFilm).not.toBeCalled();
    });

    it('should not get film details if route id param has not changed on props change', () => {
      const instance = new Film(props);

      instance.componentWillReceiveProps({
        match: { params: { id: '1', title: 'TITLE' } },
        film: {
          id: 1,
          title: 'TITLE',
        },
      });

      expect(props.getFilmDetails).not.toBeCalled();
    });

    it('should not get film details if route id param changed but film details are available on props change', () => {
      const instance = new Film(props);

      instance.componentWillReceiveProps({
        match: { params: { id: '2', title: 'TITLE2' } },
        film: {
          id: 2,
          title: 'TITLE2',
          runtime: 120,
          cast: [
            { character: 'CHARACTER1', name: 'NAME1' },
            { character: 'CHARACTER2', name: 'NAME2' },
          ],
          director: 'DIRECTOR',
        },
      });

      expect(props.getFilmDetails).not.toBeCalled();
    });

    it('should handle film selection', () => {
      jest.spyOn(global.window, 'scrollTo');

      const wrapper = shallow(<Film {...props} />);

      wrapper.find('List').simulate('selectFilm', props.film);

      expect(global.window.scrollTo).toBeCalledWith(0, 0);
    });

    it('should push to route history on handle film selection', () => {
      const wrapper = shallow(<Film {...props} />);

      wrapper.find('List').simulate('selectFilm', props.film);

      expect(props.history.push).toBeCalledWith('/film/1/TITLE');
    });

    it('should handle search click', () => {
      jest.spyOn(global.window, 'scrollTo');

      const wrapper = shallow(<Film {...props} />);

      wrapper.find('FilmHeader').simulate('searchClick');

      expect(global.window.scrollTo).toBeCalledWith(0, 0);
    });

    it('should set searchBy to director if film director is available on search click', () => {
      const wrapper = shallow(<Film {...props} />);

      wrapper.find('FilmHeader').simulate('searchClick');

      expect(props.setSearchBy).toBeCalledWith('director');
    });

    it('should push to route history with director name if available on handle search click', () => {
      const wrapper = shallow(<Film {...props} />);

      wrapper.find('FilmHeader').simulate('searchClick');

      expect(props.history.push).toBeCalledWith('/search/DIRECTOR');
    });

    it('should push to route history if director is not available on handle search click', () => {
      props.film.director = null;
      const wrapper = shallow(<Film {...props} />);

      wrapper.find('FilmHeader').simulate('searchClick');

      expect(props.history.push).toBeCalledWith('/search');
    });
  });

  describe('fetchData static method', () => {
    it('should dispatch an action required for server-side rendering data pre-fetch', () => {
      const match = { params: { id: '1' } };
      const dispatch = jest.fn();

      Film.fetchData(dispatch, match);

      expect(dispatch).toBeCalledWith('film with id 1');
    });
  });
});
