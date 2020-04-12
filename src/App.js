import React from 'react';
import {BrowserRouter as Router , Route , Switch } from 'react-router-dom';
import indexRoutes from './routes/index'

class App extends React.Component {
  render(){
    return(
      <Router>
        <Switch>
          {indexRoutes.map((prop, key) => {
            return (
              <Route
                path={prop.path}
                key={key}
                component={prop.component}
                exact={prop.exact ? true : false}
              />
            );
          })}
        </Switch>
    </Router>
    );
  }
}
export default App;
