import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import './assets/styles/index.css'
import 'semantic-ui-css/semantic.min.css'
import App from './App';
import rootReducer from './reducers'

import reportWebVitals from './reportWebVitals';


const store = createStore(
  rootReducer,

  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()  
);


ReactDOM.render(
   <Router>
     <Provider store={store}> 
      
        <App />
      
     </Provider>
   </Router>,
    
    

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
