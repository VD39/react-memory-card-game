import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Game from './Game';

import './Start.css';

class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStarted: false,
      characters: []
    };
    this.startGame = this.startGame.bind(this);
    this.gameEnded = this.gameEnded.bind(this);
  }

  /**
   * Starts the game and sets the state.
   */
  startGame() {
    const characters = this.props.characters.slice(0).sort(() => .5 - Math.random()).slice(0, 6);
    this.setState({
      gameStarted: true,
      characters
    });
  }

  /**
   * Ends the game and sets the state.
   */
  gameEnded() {
    this.setState({
      gameStarted: false
    });
  }

  /**
   * Render start component.
   */
  render() {
  const game = this.state.gameStarted ? <Game characters={this.state.characters} gameEnded={this.gameEnded} /> : <button className="btn" onClick={this.startGame}>Start</button>;
  return (
    <div className="wrapper">
      {game}
    </div>
    );
  }
}

/**
 * Proptypes
 */
Start.propTypes = {
  characters: PropTypes.array.isRequired
};

export default Start;
