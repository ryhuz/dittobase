import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Main/Home';
import Navigation from './Main/Navigation';
import Search from './Main/Search/Search';

function App() {
  return (
    <Router>
      <Navigation />

      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/pokemon" exact>
          <Search />
        </Route>
        <Route>

        </Route>
        <Route>

        </Route>
      </Switch>
    </Router>
  )
}

export default App
