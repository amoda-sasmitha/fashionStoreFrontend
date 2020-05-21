      /*  eslint-disable */

import React from 'react';

import RootRouter from './RootRouter'
import { PersistGate } from 'redux-persist/integration/react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import redux
import { Provider } from 'react-redux'
import {store, persistor } from './store/store'
//custome alert css
import "./asserts/commoncss/alerts.css";

toast.configure() 

class App extends React.Component {

 

  render(){
    return(
      <Provider store={store}>
        <PersistGate persistor={persistor} >
          <RootRouter/>
        </PersistGate>
      </Provider>
    );
    }
  }

  
export default App;
