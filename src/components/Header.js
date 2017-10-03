// Import dependencies
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders the Header component.
 * @param {element} button Button prop
 */
const Header = ({ button }) => (
  <header className="header center">
    <div className="wrapper">
      <h1 className="left">Memory Game: Find The Pairs</h1>
      <div id="game-control-buttons" className="right">
        {button}
      </div>
    </div>
  </header>
);

/**
 * Proptypes
 */
Header.propTypes = {
  button: PropTypes.element.isRequired
};

// Export
export default Header;
