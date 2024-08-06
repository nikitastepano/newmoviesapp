import React from 'react';
import { Spin, Rate } from 'antd';
import { format } from 'date-fns';

export class MoviesItem extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isLoading: true,
      ratedCount: props.movie.rating || 0,
    };
  }

  handleImageLoad = () => {
    this.setState({ isLoading: false });
  };

  handleImageError = (event) => {
    event.target.src = '/noImage.png';
    this.setState({ isLoading: false });
  };

  controlOverview = (overview, maxLength = 197) => {
    if (overview.length > maxLength) {
      return overview.substring(0, maxLength) + '...';
    }
    return overview;
  };

  controlTittle = (original_title, maxLength = 19) => {
    if (original_title.length > maxLength) {
      return original_title.substring(0, maxLength) + '...';
    }
    return original_title;
  };

  getPopularityColor = (roundedPopularity) => {
    if (roundedPopularity > 7) {
      return 'green';
    } else if (roundedPopularity > 4) {
      return 'orange';
    } else {
      return 'red';
    }
  };

  render() {
    const { genre_ids, original_title, overview, vote_average, poster_path, release_date } = this.props.movie;
    const { janary, onRated } = this.props;

    const roundedPopularity = vote_average ? vote_average.toFixed(1) : 'N/A';
    const popularityColor = this.getPopularityColor(roundedPopularity);
    const formattedReleaseDate = release_date ? format(release_date, 'PP') : 'Дата пуста';
    const truncatedOverview = this.controlOverview(overview) || 'Описание не найдено';
    const controlTittleOriginalTittle = this.controlTittle(original_title) || 'Название отсутствует';
    const hasPosterPath = poster_path && poster_path.trim() !== '';
    const imageUrl = hasPosterPath ? `https://image.tmdb.org/t/p/w500${poster_path}` : '/noImage.png';

    const genres = janary.filter((genre) => genre_ids.some((id) => genre.id === id)).slice(0, 2);

    const setRating = (value) => {
      this.setState({
        ratedCount: value,
      });
      onRated(this.props.movie, value);
    };

    return (
      <li className="moviesitem">
        <div className="moviesitem__left">
          {this.state.isLoading && <Spin style={{ zIndex: 50 }} size="large" />}
          <img
            style={{ display: this.state.isLoading ? 'none' : 'block' }}
            onLoad={this.handleImageLoad}
            onError={this.handleImageError}
            className="moviesitem__left-img"
            src={imageUrl}
            alt=""
          />
        </div>
        <div className="moviesitem__right">
          <div className="moviesitem__right-top">
            <h1 className="moviesitem__right-top__tittle">{controlTittleOriginalTittle}</h1>
            <div style={{ borderColor: popularityColor }} className="moviesitem__right-top__circle">
              {roundedPopularity}
            </div>
          </div>
          <div className="moviesitem__right-bottom">
            <data className="moviesitem__right-bottom__date">{formattedReleaseDate}</data>
            <div className="helper">
              {genres.length !== 0 ? (
                genres.map((genre) => {
                  return (
                    <button key={genre.id} className="moviesitem__right-bottom__janrs">
                      {genre.name}
                    </button>
                  );
                })
              ) : (
                <div className="moviesitem__right-bottom__janrs">Нет жанра</div>
              )}
            </div>
            <p className="moviesitem__right-bottom__informations">{truncatedOverview}</p>
            <div className="moviesitem__right-bottom__stars">
              <Rate onChange={setRating} count={10} value={this.state.ratedCount} />
            </div>
          </div>
        </div>
      </li>
    );
  }
}
