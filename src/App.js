import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import About from './Main/About';
import Home from './Main/Home';
import Missing from './Main/Missing';
import Navigation from './Main/Navigation';
import Pokemon from './Main/Pokemon/Pokemon';
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
        </Route >
        <Route path="/pokemon/:id" >
          <Pokemon />
        </Route>
        <Route path="/missing/" >
          <Missing />
        </Route>
        <Route path="/about" >
          <About />
        </Route>
        <Route path="/">
          <Missing />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
