// Import dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Import images
import CHARACTERS_IMAGES from '../characters-images';

/**
 * Character component.
 */
class Character extends Component {
  constructor(props) {
    super(props); // Super
    this.characterClick = this.characterClick.bind(this); // Click event
  }

  /**
   * Will call the prop clickedCharacter event when the c is clicked.
   */
  characterClick() {
    // Check if character is selected
    if (!this.props.selected) {
      this.props.clickedCharacter(this.props.index); // Call clickedCharacter event
    }
  }

  /**
   * Render the Character component.
   */
  render() {
    const selected = classNames({
      matched: this.props.matched,
      selected: this.props.selected
    }); // Character class names
    return (
      <div className={`flip effect__hover ${selected}`} onClick={this.characterClick} role="button" tabIndex={-1}>
        <div className="flip__back">
          <div className={`character ${selected}`}>
            <img className="image" src={CHARACTERS_IMAGES[this.props.character.replace(/ /g, '-').toLowerCase()]} alt="" />
            <p className="character-name">{this.props.character}</p>
          </div>
        </div>
        <div className="flip__front">
          <div className="character" />
        </div>
      </div>
    );
  }
}

/**
 * Proptypes.
 */
Character.propTypes = {
  character: PropTypes.string.isRequired,
  matched: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  clickedCharacter: PropTypes.func.isRequired
};

// Export
export default Character;
