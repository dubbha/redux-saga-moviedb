import React, { Component, StrictMode } from 'react';
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
        by: PropTypes.string,
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
    isError: PropTypes.bool.isRequired,
    searchByTitle: PropTypes.func.isRequired,
    searchByDirector: PropTypes.func.isRequired,
    setQuery: PropTypes.func.isRequired,
    setResults: PropTypes.func.isRequired,
    clearResults: PropTypes.func.isRequired,
    setSearchBy: PropTypes.func.isRequired,
    setSortBy: PropTypes.func.isRequired,
    setIsError: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    // SSR-ready replacement for the deprecated componentWillMount()
    // while componentDidMount() is not fired on server
    const {
      match: { params },
      query,
      searchBy,
      searchByTitle,
      searchByDirector,
      setQuery,
      setSearchBy,
    } = props;

    if (params.query) {
      const paramsSearchBy = decodeURIComponent(params.by);
      const paramsQuery = decodeURIComponent(params.query);

      if (paramsQuery !== query || paramsSearchBy !== searchBy) {
        setQuery(paramsQuery);
        setSearchBy(paramsSearchBy);

        if (paramsSearchBy === 'director') {
          searchByDirector();
        } else {
          searchByTitle();
        }
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.query !== prevProps.match.params.query
        || this.props.match.params.by !== prevProps.match.params.by) {
      const { setQuery, setSearchBy, clearResults, searchByDirector, searchByTitle } = this.props;

      if (this.props.match.params.query) {
        const nextPropsQuery = decodeURIComponent(this.props.match.params.query);
        const nextPropsSearchBy = decodeURIComponent(this.props.match.params.by);

        setQuery(nextPropsQuery);
        setSearchBy(nextPropsSearchBy);

        if (nextPropsSearchBy === 'director') {
          searchByDirector();
        } else {
          searchByTitle();
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
      searchByTitle,
      searchByDirector,
      clearResults,
      setIsError,
    } = this.props;

    e.preventDefault(); // submitting the form to support search on enter
    setIsError(false); // reset error if any

    if (searchBy && query) {
      history.push(`/search/${searchBy}/${encodeURIComponent(query)}`);
      if (searchBy === 'director') {
        searchByDirector();
      } else {
        searchByTitle();
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
      isError,
    } = this.props;

    return (
      <StrictMode>
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
            isError={isError}
          />
          <Footer />
        </div>
      </StrictMode>
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
  isError: selectors.isErrorSelector(state),
});

const mapDispatchToProps = {
  searchByTitle: actions.searchByTitle,
  searchByDirector: actions.searchByDirector,
  setQuery: actions.setQuery,
  setResults: actions.setResults,
  clearResults: actions.clearResults,
  setSearchBy: actions.setSearchBy,
  setSortBy: actions.setSortBy,
  setIsError: actions.setIsError,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
