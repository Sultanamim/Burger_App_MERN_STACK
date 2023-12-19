import React from 'react';
import './App.css';
import MainComponent from './Components/MainComponent';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {Store} from './redux/store';

function App() {
  return (
    <div className="App">
      <Provider store={Store}>
        <BrowserRouter>
          <MainComponent />
        </BrowserRouter>
      </Provider>
    
    </div>
  );
}

export default App;
