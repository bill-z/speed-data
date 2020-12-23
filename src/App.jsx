import React from 'react'
import { Route, Switch, Redirect } from "wouter";
import { Home, Stats, Admin } from './pages'

const App = () => (
    <Switch>
      <Route path="/stats"><Stats /></Route>
      <Route path="/admin"><Admin /></Route>
      <Route path="/"><Home /></Route>
      <Route>
        <Redirect to="/"></Redirect>
      </Route>
    </Switch>
  )

export default App