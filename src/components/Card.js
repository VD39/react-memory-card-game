import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './Card.css';

class Card extends Component {
  constructor() {
    super();
    this.state = {
      selected: false,
      matched: false
    }
    this.cardClick = this.cardClick.bind(this);
  }

  /**
   * Class the clickedCard event from the sent in props.
   */
  cardClick() {
    if(!this.state.selected) {
      this.props.clickedCard(this);
    }
  }

  /**
   * Sets the state to show the card when selected.
   */
  showCard() {
    this.setState({
      selected: true,
      matched: false
    });
  }

  /**
   * Sets the state to hide the card when selected.
   */
  hideCard() {
    setTimeout(() => {
      this.setState({
        selected: false
      });
    }, 700);
  }

  /**
   * Sets the state to match the card when selected.
   */
  matchedCard() {
    this.setState({
      selected: true,
      matched: true
    });
  }

  /**
   * Render the card.
   */
  render() {
    const cn = classNames({
      'selected': this.state.selected,
      'matched': this.state.matched
    });
    return (
      <div className="card" onClick={this.cardClick}>
        <div className={cn}>
          <p className="character-name">{this.props.character}</p>
        </div>
      </div>
    );
  }
}

/**
 * Proptypes
 */
Card.propTypes = {
  character: PropTypes.string.isRequired,
  clickedCard: PropTypes.func.isRequired
};

export default Card;
