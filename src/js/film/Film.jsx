import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FilmHeader from '../common/filmHeader';
import Result from '../common/result';
import List from '../common/list';
import Footer from '../common/footer';
import filmPropShape from '../common/utils/propShapes';
import * as selectors from '../common/store/selectors';
import * as actions from '../common/store/actions';

export class Film extends Component {
  static defaultProps = {
    film: null,
    filteredResults: null,
  };

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
      }),
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
    film: PropTypes.shape(filmPropShape),
    filteredResults: PropTypes.arrayOf(PropTypes.shape(filmPropShape)),
    getFilm: PropTypes.func.isRequired,
    getFilmDetails: PropTypes.func.isRequired,
    searchByDirector: PropTypes.func.isRequired,
    setSearchBy: PropTypes.func.isRequired,
    setIsError: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isFilmLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
  };

  static fetchData = (dispatch, match) =>
    dispatch(actions.getFilm(match.params.id));

  componentDidMount() {
    const {
      match: { params },
      film,
      filteredResults,
      getFilm,
      getFilmDetails,
      searchByDirector,
    } = this.props;

    const id = +params.id;

    if (!film) {
      getFilm(id);
    } else {
      if (!film.runtime || !film.cast || !film.director) {
        getFilmDetails(film);
      }
      if (filteredResults && filteredResults.length === 0 && film.director) {
        searchByDirector(film.director);
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      const { film } = this.props;
      const { id } = this.props.match.params;
      const { getFilm, getFilmDetails } = prevProps;

      if (!film) {
        getFilm(id);
      } else if (!film.runtime || !film.cast || !film.director) {
        getFilmDetails(film);
      }
    }
  }

  handleSelectFilm = (film) => {
    const { history, setIsError } = this.props;

    setIsError(false);

    window.scrollTo(0, 0);
    history.push(`/film/${film.id}/${encodeURIComponent(film.title)}`);
  }

  handleSearchClick = () => {
    const { history, setSearchBy, setIsError, film } = this.props;

    setIsError(false);

    window.scrollTo(0, 0);

    if (film.director) {
      setSearchBy('director');
      history.push(`/search/${encodeURIComponent(film.director)}`);
    } else {
      history.push('/search');
    }
  }

  render() {
    const { isLoading, isFilmLoading, isError, film, filteredResults } = this.props;

    return (
      <div className="app__container">
        {
          film && (
            <FilmHeader
              film={film}
              onSearchClick={this.handleSearchClick}
            />
          )
        }
        {
          film && !isFilmLoading && (
            <Result
              film={film}
              results={filteredResults}
            />
          )
        }
        <List
          results={filteredResults}
          onSelectFilm={this.handleSelectFilm}
          isLoading={isLoading || isFilmLoading}
          isError={isError}
        />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  film: selectors.filmSelector(state, props),
  filteredResults: selectors.filteredResultsSelector(state, props),
  isLoading: selectors.isLoadingSelector(state),
  isFilmLoading: selectors.isFilmLoadingSelector(state),
  isError: selectors.isErrorSelector(state),
});

const mapDispatchToProps = {
  getFilm: actions.getFilm,
  getFilmDetails: actions.getFilmDetails,
  searchByDirector: actions.searchByDirector,
  setSearchBy: actions.setSearchBy,
  setIsError: actions.setIsError,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Film);
