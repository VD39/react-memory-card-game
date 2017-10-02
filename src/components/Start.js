// Import dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import components
import Header from './Header';
import Game from './Game';

/**
 * Start component.
 */
class Start extends Component {
  constructor(props) {
    super(props); // Super
    this.state = {
      gameStarted: false,
      characters: []
    }; // Set intial state
    this.startResetGame = this.startResetGame.bind(this); // Click events
  }

  /**
   * Starts the game and sets the state.
   */
  startResetGame() {
    // Get 6 characters from props
    const characters = this.props.characters.slice(0).sort(() => 0.5 - Math.random()).slice(0, 6);
    this.setState({
      gameStarted: true,
      characters
    }); // Set state
  }

  /**
   * Render Start component.
   */
  render() {
    // Check if game has started, and render game else welcome message
    const game = this.state.gameStarted ? <Game characters={this.state.characters} /> : (
      <div className="message">
        <h2>Click start to begin game.</h2>
        <button className="btn" onClick={this.startResetGame}>Start</button>
      </div>
    );

    // Check if game has started and not ended, and render reset else start button
    const button = <button className="btn" onClick={this.startResetGame}>{this.state.gameStarted ? 'Reset' : 'Start'}</button>;

    return (
      <div>
        <Header button={button} />
        <div className="wrapper">
          {game}
        </div>
      </div>
    );
  }
}

/**
 * Proptypes
 */
Start.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

// Export
export default Start;
