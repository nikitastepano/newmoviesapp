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
    const imageUrl = hasPosterPath ? `https://image.tmdb.org/t/p/w500${poster_path}` : 'data:image/jpeg;base64,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';

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
