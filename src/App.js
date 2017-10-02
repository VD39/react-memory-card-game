// Import dependencies
import React from 'react';

// Import componets
import Start from './components/Start';

// Import characters object
import CHARACTERS from './characters';

/**
 * Renders the App component.
 */
const App = () => (
  <Start characters={CHARACTERS} />
);

// Export
export default App;
