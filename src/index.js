import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './store';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {disableReactDevTools} from "@fvilers/disable-react-devtools";
import {HelmetProvider} from "react-helmet-async";

if(process.env.REACT_APP_NODE_ENV==="production") disableReactDevTools()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <HelmetProvider>
      <App />
      </HelmetProvider>
      </BrowserRouter>
    </Provider>
 
  </React.StrictMode>
);


