import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SearchHeader from '../common/searchHeader';
import Result from '../common/result';
import List from '../common/list';
import Footer from '../common/footer';
import filmPropShape from '../common/utils/propShapes';
import * as actions from '../common/store/actions';
import * as selectors from '../common/store/selectors';

export class Search extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        query: PropTypes.string,
      }),
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
    query: PropTypes.string.isRequired,
    results: PropTypes.arrayOf(PropTypes.shape(filmPropShape)).isRequired,
    searchBy: PropTypes.string.isRequired,
    sortBy: PropTypes.string.isRequired,
    searchByParams: PropTypes.arrayOf(PropTypes.string).isRequired,
    sortByParams: PropTypes.arrayOf(PropTypes.string).isRequired,
    isLoading: PropTypes.bool.isRequired,
    searchByTitle: PropTypes.func.isRequired,
    searchByDirector: PropTypes.func.isRequired,
    setQuery: PropTypes.func.isRequired,
    setResults: PropTypes.func.isRequired,
    clearResults: PropTypes.func.isRequired,
    setSearchBy: PropTypes.func.isRequired,
    setSortBy: PropTypes.func.isRequired,
  };

  static fetchData = (dispatch, match) => {
    if (match.params.query) {
      const paramsQuery = decodeURIComponent(match.params.query);
      dispatch(actions.setQuery(paramsQuery));
      return dispatch(actions.searchByDirector(paramsQuery));
    }
    return Promise.resolve();
  }

  componentWillMount() {
    const {
      match: { params },
      query,
      searchBy,
      sortBy,
      searchByTitle,
      searchByDirector,
      setQuery,
    } = this.props;

    if (params.query) {
      const paramsQuery = decodeURIComponent(params.query);
      if (paramsQuery !== query) {
        setQuery(paramsQuery);
        if (searchBy === 'director') {
          searchByDirector(paramsQuery, sortBy);
        } else {
          searchByTitle(paramsQuery, sortBy);
        }
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.query !== this.props.match.params.query) {
      const { searchBy, sortBy, setQuery, clearResults, searchByDirector, searchByTitle } = nextProps;

      if (nextProps.match.params.query) {
        const nextPropsQuery = decodeURIComponent(nextProps.match.params.query);

        setQuery(nextPropsQuery);
        if (searchBy === 'director') {
          searchByDirector(nextPropsQuery, sortBy);
        } else {
          searchByTitle(nextPropsQuery, sortBy);
        }
      } else {
        setQuery('');
        clearResults();
      }
    }
  }

  handleSearch = (e) => {
    const {
      history,
      query,
      searchBy,
      sortBy,
      searchByTitle,
      searchByDirector,
      clearResults,
    } = this.props;

    e.preventDefault(); // submitting the form to support search on enter

    if (query) {
      history.push(`/search/${encodeURIComponent(query)}`);
      if (searchBy === 'director') {
        searchByDirector(query, sortBy);
      } else {
        searchByTitle(query, sortBy);
      }
    } else {
      history.push('/search');
      clearResults();
    }
  }

  handleQueryChange = (e) => {
    this.props.setQuery(e.target.value);
  }

  handleSelectFilm = (film) => {
    const { history } = this.props;

    window.scrollTo(0, 0);
    history.push(`/film/${film.id}/${encodeURIComponent(film.title)}`);
  }

  handleSearchByChange = (searchBy) => {
    this.props.setSearchBy(searchBy);
  }

  handleSortByChange = (sortBy) => {
    const { setSortBy, results, setResults } = this.props;

    setSortBy(sortBy);
    setResults(results, sortBy);
  }

  render() {
    const {
      query,
      results,
      searchBy,
      sortBy,
      searchByParams,
      sortByParams,
      isLoading,
    } = this.props;

    return (
      <div className="app__container">
        <SearchHeader
          query={query}
          onQueryChange={this.handleQueryChange}
          onSearch={this.handleSearch}
          searchBy={searchBy}
          onSearchByChange={this.handleSearchByChange}
          searchByParams={searchByParams}
        />
        <Result
          results={results}
          sortBy={sortBy}
          onSortByChange={this.handleSortByChange}
          sortByParams={sortByParams}
        />
        <List
          results={results}
          onSelectFilm={this.handleSelectFilm}
          isLoading={isLoading}
        />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  query: selectors.querySelector(state),
  results: selectors.resultsSelector(state),
  searchBy: selectors.searchBySelector(state),
  sortBy: selectors.sortBySelector(state),
  searchByParams: selectors.searchByParamsSelector(state),
  sortByParams: selectors.sortByParamsSelector(state),
  isLoading: selectors.isLoadingSelector(state),
});

const mapDispatchToProps = {
  searchByTitle: actions.searchByTitle,
  searchByDirector: actions.searchByDirector,
  setQuery: actions.setQuery,
  setResults: actions.setResults,
  clearResults: actions.clearResults,
  setSearchBy: actions.setSearchBy,
  setSortBy: actions.setSortBy,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
