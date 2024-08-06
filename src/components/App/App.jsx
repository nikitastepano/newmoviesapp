import React from 'react';

import { Header } from '../Header/Header';
import { getApiData, getApijanary } from '../../services/Request';
import { debounce } from '../../services/Debounce';
import './App.css';
import { Search } from '../Search/Search';
import { Rated } from '../Rated/Rated';

export default class App extends React.Component {
  state = {
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 0,
    janary: [],
    loading: false,
    query: '',
    activeButton: 'search',
    rated: JSON.parse(sessionStorage.getItem('rated') || JSON.stringify({})),
    error: null,
  };

  componentDidMount() {
    getApijanary().then((janaryList) => {
      this.setState({
        janary: janaryList.genres,
      });
    });
  }

  fetchMovies = (page = this.state.page, query = this.state.query) => {
    this.setState({ loading: true, error: null });
    getApiData(page, query)
      .then((objectMovies) => {
        this.setState({
          page: objectMovies.page,
          results: this.updateRating(objectMovies.results),
          total_pages: objectMovies.total_pages,
          total_results: objectMovies.total_results,
          loading: false,
        });
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        this.setState({
          loading: false,
          error: 'Something went wrong. Please try again later.',
        });
      });
  };

  fetchMoviesDebounce = debounce((query) => {
    this.fetchMovies(1, query);
  }, 500);

  handleChangePage = (page) => {
    this.fetchMovies(page, this.state.query);
  };

  handleInputChange = (event) => {
    const query = event.target.value;
    this.setState({ query }, () => {
      this.fetchMoviesDebounce(query);
    });
  };

  handleButtonClick = (buttonType) => {
    this.setState({ activeButton: buttonType });
  };

  onRated = (movie, value) => {
    const newRated = this.state.rated;

    newRated[movie.id] = { ...movie, rating: value };
    this.setState({
      results: this.state.results.map((element) => {
        if (element.id === movie.id) {
          element.rating = value;
        }
        return element;
      }),
      rated: { ...newRated },
    });
    sessionStorage.setItem('rated', JSON.stringify(newRated));
  };

  updateRating = (movies) => {
    const ratedMovies = JSON.parse(sessionStorage.getItem('rated') || JSON.stringify({}));

    return movies.map((movie) => {
      const ratedMovie = ratedMovies[movie.id];

      if (ratedMovie) {
        movie.rating = ratedMovie.rating;
      }
      return movie;
    });
  };

  render() {
    const { results, janary, loading, page, total_results, query, activeButton, rated, error } = this.state;

    return (
      <div className="newmoviesapp">
        <Header handleButtonClick={this.handleButtonClick} activeButton={activeButton} />
        {error && <div className="error">{error}</div>} {/* not a Fetch, sorry */}
        {activeButton === 'search' ? (
          <Search
            onRated={this.onRated}
            handleInputChange={this.handleInputChange}
            query={query}
            results={results}
            janary={janary}
            loading={loading}
            handleChangePage={this.handleChangePage}
            page={page}
            total_results={total_results}
          />
        ) : (
          <Rated
            onRated={this.onRated}
            rated={Object.values(rated)}
            janary={janary}
            loading={loading}
            query={query}
            handleInputChange={this.handleInputChange}
          />
        )}
      </div>
    );
  }
}
