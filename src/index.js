import React from 'react';
// import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client'
// import { hydrate, render } from "react-dom";
import './index.css';
import App from './App';


// import reportWebVitals from './reportWebVitals';

import { Provider} from 'react-redux'
import { createStore, applyMiddleware } from 'redux' 
import thunk from 'redux-thunk'
import rootReducer from './reducers/index'
import axios from 'axios'
import { ModalProvider } from './components/modal/ModalContext';
import { ThemeProvider, createTheme } from '@mui/material';


// Sets the base URL used by the Ruby on Rails API that serves this app
// In development, the Ruby on Rails API that serves this app is started at port 3000
axios.defaults.baseURL= process.env.REACT_APP_BASE_API_URL || "http://localhost:3000"

const store = createStore(rootReducer, applyMiddleware(thunk))

const container =  document.getElementById('root');
const root = createRoot(container);

const navyBlue = '#3f51b5';
const darkPink = '#f50057';

const theme = createTheme({
  palette: {
    primary: {
      main: navyBlue,
      dark: '#303f9f'
    },
    secondary: {
      main: darkPink,
      dark: '#c51162'
    }
  }
});

root.render(
  <Provider store = {store} >
    <ThemeProvider theme={theme}>
      <ModalProvider>
        <App />
      </ModalProvider>
    </ThemeProvider>
  </Provider>
);


// New rendering using react-snap dependency
// const rootElement = document.getElementById("root");

// if (rootElement.hasChildNodes()) {
//   hydrate(
//     <Provider store = {store} >
//       <ModalProvider>
//          <App />
//       </ModalProvider>
//     </Provider>, 
//     rootElement
//     );
// } else {
//   render(
//     <Provider store = {store} >
//       <ModalProvider>
//          <App />
//       </ModalProvider>
//     </Provider>, 
//     rootElement
//   );
// }

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
