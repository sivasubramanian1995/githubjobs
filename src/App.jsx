import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect, useLocation } from 'react-router-dom';
import './App.less';
import config from 'config';
import to from 'await-to-js'
import { Home } from '@/Home';

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home}/>
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
