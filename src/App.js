      /*  eslint-disable */

import React from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory, withRouter } from 'react-router-dom';
import indexRoutes from './routes/index'

import adminRoutes from './routes/adminroutes'
import loginUserRoutes from './routes/loginUser'

import U_User from './controllers/User'
import A_Admin from './controllers/Admin'

import U_Util from './controllers/Util'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import managerRoutes from './routes/manager.routes'

// import redux
import { Provider } from 'react-redux'
import store from './store/store'
//custome alert css
import "./asserts/commoncss/alerts.css";

toast.configure() 

class App extends React.Component {

  router = () => {
    let routes = indexRoutes;

    let checkSignedIn =  U_User.checkSignedIn();
    let role = U_Util.getType();

    if(checkSignedIn == true ){
      routes = [...loginUserRoutes , ...routes ];
    }

    if(checkSignedIn == true && role == "manager"){
     routes = [ ...managerRoutes, ...routes ];
    }

    if( checkSignedIn == true && role == "admin" ){
      routes = [ ...adminRoutes ,...managerRoutes, ...routes ];
    }

    return routes;
  } 

  render(){
    return(
      <Provider store={store}>
        <Router >
           <Switch>
             { this.router().map((prop, key) => {
               return (
               <Route
                   path={prop.path}
                   key={key}
                   component={(props) => <prop.component isAuthed={U_User.checkSignedIn()}   {...props} />}
                   exact={prop.exact ? true : false}

                 />
               );
             })}
           </Switch>
        </Router>
      </Provider>
    );
    }
  }
export default App;
