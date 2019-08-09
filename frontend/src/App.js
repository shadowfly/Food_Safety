import React, { Component } from 'react';
import { Button } from 'antd';
import './App.css';
import Roles from './pages/Roles';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Roles />
      </div>
    );
  }
}

export default App;