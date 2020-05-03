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

  render(){
    return(
      <Provider store={store}>
        {U_User.checkSignedIn() == true ? U_Util.getType() == "admin" ? <Router>
          <Switch>
            {adminRoutes.map((prop, key) => {
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
          // user
          : <Router>
            <Switch>
              {loginUserRoutes.map((prop, key) => {
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


          : <Router>
            <Switch>
              {indexRoutes.map((prop, key) => {
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
          </Router>}








      </Provider>
    );
  }
}
export default App;
