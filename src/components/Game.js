// Import dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import components
import Character from './Character';

/**
 * Character component.
 */
class Game extends Component {
  constructor(props) {
    super(props); // Super
    this.state = this.setInitialState(props.characters); // Set intial state
    this.clickedCharacter = this.clickedCharacter.bind(this); // Click events
  }

  /**
   * Render the new state when new props are received.
   * @param {any} nextProps // Props from parents
   */
  componentWillReceiveProps(nextProps) {
    this.setState(this.setInitialState(nextProps.characters)); // Set new state with initial state
  }

  /**
   * Set and return the new array with added selected and matched fields.
   * @param {array} characters Array of characters
   */
  setCharacters(characters) {
    // Return new array
    return characters
      .concat(characters)
      .reduce((array, current) => {
        array.push({
          character: current,
          selected: false,
          matched: false
        }); // Add new fields to array
        return array; // Return array
      }, []);
  }

  /**
   * Set and return the initial state of the component.
   * @param {array} characters Array of characters
   */
  setInitialState(characters) {
    // Return new object with default fields
    return {
      characters: this.setCharacters(characters),
      selected: null,
      gameEnded: false,
      paused: false,
      matches: 0,
      attempts: 0
    };
  }

  /**
   * Check and return if the characters selected are a match.
   * @param {number} index1 // Index of first character
   * @param {number} index2 // Index of second character
   */
  isMatch(index1, index2) {
    const characters = this.state.characters; // Get characters from state
    const character1 = characters[index1].character.replace(/ /g, '-').toLowerCase(); // Get character 1 character
    const character2 = characters[index2].character.replace(/ /g, '-').toLowerCase(); // Get character 2 character
    return character1 === character2; // Return if they are match
  }

  /**
   * Checks the characters to see if they are a match or not.
   * @param {object} index // Index of the character
   */
  clickedCharacter(index) {
    // Check if state is paused
    if (this.state.paused) {
      return; // Return
    }

    const characters = this.state.characters; // Get characters from state
    characters[index].selected = true; // Set current charater to selected
    this.setState({
      characters,
      paused: true
    }); // Set state

    // Check if state has selected value
    if (!this.state.selected && this.state.selected !== 0) {
      this.setState({
        selected: index,
        paused: false
      }); // Set state
    } else {
      const attempts = this.state.attempts + 1; // Get attempts
      this.setState({ attempts }); // Set state
      // Check if characters are a match
      if (this.isMatch(index, this.state.selected)) {
        const matches = this.state.matches + 1; // Plus one to matches
        characters[index].matched = true; // Set current character matched to true
        characters[this.state.selected].matched = true; // Set selected character matched to true
        this.setState({
          characters,
          selected: null,
          paused: false,
          matches,
          gameEnded: matches === this.state.characters.length / 2
        }); // Set state
      } else {
        // Set timeout to delay hiding of character
        setTimeout(() => {
          characters[index].selected = false; // Set current character to false
          characters[this.state.selected].selected = false; // Set selected character to false
          this.setState({
            characters,
            selected: null,
            paused: false
          }); // Set state
        }, 700);
      }
    }
  }

  /**
   * Render the Game component.
   */
  render() {
    // Set complete if game has ended
    const complete = this.state.gameEnded ? (<div className="message">
      <h2>{`Congratulations! You've matched all characters in ${this.state.attempts} moves.`}</h2>
    </div>) : null;

    // Set characters
    const characters = this.state.characters.map((character, index) => ((
      <Character
        key={index}
        character={character.character}
        matched={character.matched}
        selected={character.selected}
        index={index}
        clickedCharacter={this.clickedCharacter}
      />
    )));
    return (
      <div className="characters-wrapper clear">
        {complete}
        <div id="characters">
          {characters}
        </div>
      </div>
    );
  }
}

/**
 * Proptypes
 */
Game.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

export default Game;
