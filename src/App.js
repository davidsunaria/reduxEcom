import logo from './logo.svg';
import React from "react"
import { BrowserRouter, Link, Route, Switch } from "react-router-dom"
import { Provider } from 'react-redux';
import Home from "./Component/Home"
import Admin from "./Admin/Admin"
import './App.css';
import mystore from './reducer/mystore'

function App() {
  return (
    <>
      <Provider store={mystore} >
        <BrowserRouter>
          <Switch>
            <Route path="/admin" component={Admin} />
            <Route path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
