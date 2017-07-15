import React from 'react'
import ReactDOM from 'react-dom'
import { Router, hashHistory } from 'react-router'
import Navigation from './config/routes'

ReactDOM.render(
	<Router history={hashHistory}
	 routes={Navigation}
	/>, 
	document.getElementById('root')); 
