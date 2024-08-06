import React from 'react';

import { MoviesList } from '../MoviesList/MoviesList';

export class Rated extends React.Component {
  render() {
    const { onRated, rated, janary, loading, query, handleInputChange } = this.props;
    return (
      <div className="top">
        <MoviesList
          onRated={onRated}
          results={rated}
          janary={janary}
          loading={loading}
          query={query}
          handleInputChange={handleInputChange}
        />
      </div>
    );
  }
}
