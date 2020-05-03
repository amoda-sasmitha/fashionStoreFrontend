import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import indexRoutes from './routes/index'

import adminRoutes from './routes/adminroutes'
import loginUserRoutes from './routes/loginUser'

import U_User from './controllers/User'

import U_Util from './controllers/Util'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

    //if(manager){
    //  routes = [...routes , ...manager ];
    //}

    if( checkSignedIn == true && role == "admin" ){
      routes = [ ...adminRoutes , ...routes ];
    }

    console.log( role , routes );
    return routes;
  } 

  render(){
    return(
      <Provider store={store}>
        <Router>
           <Switch>
             { this.router().map((prop, key) => {
               return (
               <Route
                   path={prop.path}
                   key={key}
                   component={() => <prop.component isAuthed={U_User.checkSignedIn()} />}
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
