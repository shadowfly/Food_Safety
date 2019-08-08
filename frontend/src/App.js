import React, { Component } from 'react';
import { Button } from 'antd';
import './App.css';
import UserPage from './pages/User';

class App extends Component {
  render() {
    return (
      <div className="App">
        <UserPage />
      </div>
    );
  }
}

export default App;