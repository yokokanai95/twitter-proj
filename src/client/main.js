/* Copyright G. Hemingway, 2015 - All rights reserved */
"use strict";
require('./styles.css');

// Necessary modules
import React from 'react'
import { render } from 'react-dom'
import Landing from './index.js'
import { Router, Route, hashHistory } from 'react-router'
// require('./styles.css');

/*************************************************************************/

render((
  <Router history={hashHistory}>
    <Route path="/" component={Landing}/>
  </Router>
), document.getElementById('app'));