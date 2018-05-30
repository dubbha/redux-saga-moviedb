import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { connect } from 'react-redux';
import { Search } from 'search/Search';

jest.mock('react', () => {
  const reactMock = require('React');
  reactMock.StrictMode = function StrictMode() {}; // named shallow mock
  return reactMock;
});

jest.mock('react-redux', () => ({
  connect: jest.fn(() => jest.fn()),
}));

jest.mock('common/store/selectors', () => ({
  querySelector: jest.fn(state => state.query),
  resultsSelector: jest.fn(state => state.results),
  searchBySelector: jest.fn(state => state.searchBy),
  sortBySelector: jest.fn(state => state.sortBy),
  searchByParamsSelector: jest.fn(state => state.searchByParams),
  sortByParamsSelector: jest.fn(state => state.sortByParams),
  isLoadingSelector: jest.fn(state => state.isLoading),
  isErrorSelector: jest.fn(state => state.isError),
}));

jest.mock('common/store/actions', () => ({
  setQuery: jest.fn(query => `setQuery action for ${query}`),
  setSearchBy: jest.fn(searchBy => `setSearchBy action for ${searchBy}`),
  searchByDirector: jest.fn(() => 'searchByDirector action'),
}));

jest.spyOn(window, 'scrollTo').mockImplementation(jest.fn()); // window.scrollTo not implemented in jsdom

describe('Search', () => {
  describe('react-redux connector', () => {
    it('should map state to props', () => {
      const mapStateToProps = connect.mock.calls[0][0];

      const state = {
        query: 'QUERY',
        results: [
          { id: 1, title: 'TITLE1' },
          { id: 2, title: 'TITLE2' },
          { id: 3, title: 'TITLE3' },
        ],
        searchBy: 'director',
        sortBy: 'rating',
        searchByParams: ['title', 'director'],
        sortByParams: ['release date', 'rating'],
        isLoading: false,
        isError: false,
      };

      expect(mapStateToProps(state)).toEqual({
        query: 'QUERY',
        results: [
          { id: 1, title: 'TITLE1' },
          { id: 2, title: 'TITLE2' },
          { id: 3, title: 'TITLE3' },
        ],
        searchBy: 'director',
        sortBy: 'rating',
        searchByParams: ['title', 'director'],
        sortByParams: ['release date', 'rating'],
        isLoading: false,
        isError: false,
      });
    });
  });

  describe('unconnected component', () => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'VALUE',
      },
    };

    let props;
    beforeEach(() => {
      props = {
        match: { params: { by: 'director', query: 'QUERY' } },
        searchBy: 'director',
        query: 'QUERY',
        history: { push: jest.fn() },
        results: [
          { id: 1, title: 'TITLE1' },
          { id: 2, title: 'TITLE2' },
          { id: 3, title: 'TITLE3' },
        ],
        sortBy: 'rating',
        searchByParams: ['title', 'director'],
        sortByParams: ['release date', 'rating'],
        searchByTitle: jest.fn(),
        searchByDirector: jest.fn(),
        setQuery: jest.fn(),
        setResults: jest.fn(),
        clearResults: jest.fn(),
        setSearchBy: jest.fn(),
        setSortBy: jest.fn(),
        setIsError: jest.fn(),
        isLoading: false,
        isError: false,
      };
    });

    it('should render successfully', () => {
      const wrapper = shallow(<Search {...props} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should set query if params query differs from stored query in constructor', () => {
      props.query = '';
      const instance = new Search(props);
      expect(instance.props.setQuery).toBeCalledWith('QUERY');
    });

    it('should search by director if params query differs from stored query in constructor', () => {
      props.query = '';
      const instance = new Search(props);
      expect(instance.props.searchByDirector).toBeCalled();
    });

    it('should search by title if params query differs from stored query in constructor', () => {
      props.query = '';
      props.searchBy = 'title';
      const instance = new Search({
        ...props,
        match: { params: { by: 'title', query: 'QUERY' } },
      });

      expect(instance.props.searchByTitle).toBeCalled();
    });

    it('should not set query if params query is empty in constructor', () => {
      props.match.params.query = '';
      const instance = new Search(props);
      expect(instance.props.setQuery).not.toBeCalled();
    });

    it('should set query if route query param changed on props change', () => {
      const instance = new Search({
        ...props,
        match: { params: { by: props.match.params.by, query: 'NEW_QUERY' } },
      });

      instance.componentDidUpdate(props);

      expect(props.setQuery).toBeCalledWith('NEW_QUERY');
    });

    it('should search by director if route query param changed on props change', () => {
      const instance = new Search({
        ...props,
        match: { params: { by: props.match.params.by, query: 'NEW_QUERY' } },
      });

      instance.componentDidUpdate(props);

      expect(props.searchByDirector).toBeCalled();
    });

    it('should search by title if route query param changed on props change', () => {
      const instance = new Search({
        ...props,
        searchBy: 'title',
        match: { params: { by: 'title', query: 'NEW_QUERY' } },
      });

      instance.componentDidUpdate({
        ...props,
        searchBy: 'title',
        match: { params: { by: 'title', query: 'QUERY' } },
      });

      expect(props.searchByTitle).toBeCalled();
    });

    it('should set query if query changed to empty string on props change', () => {
      const instance = new Search({
        match: { params: { query: '' } },
        searchBy: props.searchBy,
        sortBy: props.sortBy,
        setQuery: props.setQuery,
        clearResults: props.clearResults,
        searchByDirector: props.searchByDirector,
        searchByTitle: props.searchByTitle,
      });

      instance.componentDidUpdate(props);

      expect(props.setQuery).toBeCalledWith('');
    });

    it('should clear results if query changed to empty string on props change', () => {
      const instance = new Search({
        ...props,
        match: { params: { by: props.searchBy, query: '' } },
      });

      instance.componentDidUpdate(props);

      expect(props.clearResults).toBeCalled();
    });

    it('should not set query if query has not changed on props change', () => {
      const instance = new Search(props);

      instance.componentDidUpdate(props);

      expect(props.setQuery).not.toBeCalled();
    });

    it('should push to history on handle search', () => {
      const wrapper = shallow(<Search {...props} />);

      wrapper.find('SearchHeader').simulate('search', event);

      expect(props.history.push).toBeCalledWith('/search/director/QUERY');
    });

    it('should search by director on handle search', () => {
      const wrapper = shallow(<Search {...props} />);

      wrapper.find('SearchHeader').simulate('search', event);

      expect(props.searchByDirector).toBeCalled();
    });

    it('should search by title on handle search', () => {
      props.searchBy = 'title';
      const wrapper = shallow(<Search {...props} />);

      wrapper.find('SearchHeader').simulate('search', event);

      expect(props.searchByTitle).toBeCalled();
    });

    it('should push to history if query is empty on handle search', () => {
      props.query = '';
      const wrapper = shallow(<Search {...props} />);

      wrapper.find('SearchHeader').simulate('search', event);

      expect(props.history.push).toBeCalledWith('/search');
    });

    it('should clear results if query is empty on handle search', () => {
      props.query = '';
      const wrapper = shallow(<Search {...props} />);

      wrapper.find('SearchHeader').simulate('search', event);

      expect(props.clearResults).toBeCalledWith();
    });

    it('should handle query change', () => {
      const wrapper = shallow(<Search {...props} />);

      wrapper.find('SearchHeader').simulate('queryChange', event);

      expect(props.setQuery).toBeCalledWith('VALUE');
    });

    it('should scroll to top on select film', () => {
      const wrapper = shallow(<Search {...props} />);

      wrapper.find('List').simulate('selectFilm', { id: 1, title: 'TITLE' });

      expect(global.window.scrollTo).toBeCalledWith(0, 0);
    });

    it('should push to history select film', () => {
      const wrapper = shallow(<Search {...props} />);

      wrapper.find('List').simulate('selectFilm', { id: 1, title: 'TITLE' });

      expect(props.history.push).toBeCalledWith('/film/1/TITLE');
    });

    it('should handle searchBy change', () => {
      const wrapper = shallow(<Search {...props} />);

      wrapper.find('SearchHeader').simulate('searchByChange', 'NEW_SEARCH_BY');

      expect(props.setSearchBy).toBeCalledWith('NEW_SEARCH_BY');
    });

    it('should handle sortBy change', () => {
      const wrapper = shallow(<Search {...props} />);

      wrapper.find('Result').simulate('sortByChange', 'NEW_SORT_BY');

      expect(props.setSortBy).toBeCalledWith('NEW_SORT_BY');
    });

    it('should sort results on handle sortBy change', () => {
      const wrapper = shallow(<Search {...props} />);

      wrapper.find('Result').simulate('sortByChange', 'NEW_SORT_BY');

      expect(props.setResults).toBeCalledWith(props.results, 'NEW_SORT_BY');
    });
  });
});
