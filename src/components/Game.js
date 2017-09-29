import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Card from './Card';

import './Game.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameEnded: false
    };
    this.selected = null;
    this.isHidden = true;
    this.matches = 0;
    this.clickedCard = this.clickedCard.bind(this);
  }

  /**
   *  Checks the cards to see if they are a match or not.
   * @param {object} card
   */
  clickedCard(card) {
    if (this.isHidden) {
      if (!this.selected) {
        this.selected = card;
        card.showCard();
      } else {
        this.isHidden = false;
        card.showCard();
        const card1 = this.selected.props.character.replace(/ /g, '-').toLowerCase();
        const card2 = card.props.character.replace(/ /g, '-').toLowerCase();
        if (card1 === card2) {
          this.selected.matchedCard();
          card.matchedCard();
          this.matches++;
          if(this.matches === this.props.characters.length) {
            this.setState({
              gameEnded:true
            });
            this.matches = 0;
          }
        } else {
          this.selected.hideCard();
          card.hideCard();
        }
        setTimeout(() => {
          this.isHidden = true;
          this.selected = null;
        }, 500);
      }
    }
  }

  /**
   * Render the game.
   */
  render() {
    const cn = classNames({
      'btn': true,
      'btn-hide': !this.state.gameEnded,
      'eneded': this.state.gameEnded
    });
    const cards = this.props.characters
      .concat(this.props.characters)
      .map((b, n) => <Card character={b} key={n} clickedCard={this.clickedCard} />);
    return (
      <div className="cards-wrapper clear">
        <button className={cn} onClick={this.props.gameEnded}>Reset</button>
        <div id="cards">
          {cards}
        </div>
      </div>
    );
  }
}

/**
 * Proptypes
 */
Game.propTypes = {
  characters: PropTypes.array.isRequired,
  gameEnded: PropTypes.func.isRequired
};

export default Game;
