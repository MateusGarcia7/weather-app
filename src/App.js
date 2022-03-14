
import './App.css';
import React, {useEffect,useState} from 'react';
import axios from 'axios';
import Weather from './components/Weather';
import Converter from './components/Converter';

function App() {
  
  return (
    <div className="App" >  
    <Weather/>
   
      
    </div>
  );
}

export default App;

