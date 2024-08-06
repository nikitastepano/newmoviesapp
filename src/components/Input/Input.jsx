import React from 'react';

export class Input extends React.Component {
  render() {
    const { handleInputChange, query } = this.props;

    return (
      <input
        onChange={handleInputChange}
        value={query}
        className="movieslist__input"
        type="text"
        placeholder="Tap to search movies :)"
      />
    );
  }
}
