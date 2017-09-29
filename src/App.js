import React, { Component } from 'react';
import './App.css';

import characters from './characters';
import Start from './components/Start'

class App extends Component {
  render() {
    return (
      <Start characters={characters}/>
    );
  }
}

export default App;
