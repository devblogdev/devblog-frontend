import React from 'react';
import ReactDOM from 'react-dom';
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


// axios.defaults.baseURL= 'http://localhost:3000'
axios.defaults.baseURL= process.env.REACT_APP_BASE_API_URL

const store = createStore(rootReducer, applyMiddleware(thunk))


ReactDOM.render(
  <Provider store = {store} >
    <ModalProvider>
      <App />
    </ModalProvider>
  </Provider>,
  document.getElementById('root')
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
