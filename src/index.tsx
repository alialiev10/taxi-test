import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createGlobalStyle} from "styled-components";
import mainBackground from './assets/images/taxi-bgc.jpg'
import {Provider} from 'react-redux'
import store from "./store";


const GlobalStyle = createGlobalStyle`
  body{
    background-image: url(${mainBackground});
    background-size: cover;
    background-repeat: no-repeat;
    font-family: 'Montserrat', sans-serif;
  }
`;

ReactDOM.render(
  <>
    <Provider store={store}>
        <GlobalStyle/>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>
  </>,
  document.getElementById('root')
);


