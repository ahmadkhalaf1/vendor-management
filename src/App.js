import React from 'react';

import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';
import Home from "./components/home";
import { StateProvider } from './hooks/state';
import { Reducer, initialState } from "./hooks/reducer";


const App = () => {

  return (
    <StateProvider initialState={initialState} reducer={Reducer}>
      <Home />
    </StateProvider>
  );
}

export default App;
