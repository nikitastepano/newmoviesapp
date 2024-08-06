import React from 'react';
import { Spin } from 'antd';

import { MoviesItem } from '../MoviesItem/MoviesItem';

export class MoviesList extends React.Component {
  render() {
    const { results, janary, loading, onRated } = this.props;

    if (loading) {
      return <Spin style={{ zIndex: 50, top: '50%', left: '50%' }} size="large" />;
    }

    return (
      <>
        <ul className="movieslist">
          {results?.map((movie) => {
            const { id } = movie;
            return <MoviesItem key={id} movie={movie} janary={janary} onRated={onRated} />;
          })}
        </ul>
      </>
    );
  }
}
