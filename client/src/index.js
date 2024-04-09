import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Provider} from "react-redux"
import App from './App';
import store from './store/reduxStore';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
        <Route path='*' element={ <App />}/>
      </Routes>
     
      </BrowserRouter>
       
    </Provider>
   
  </React.StrictMode>
);

