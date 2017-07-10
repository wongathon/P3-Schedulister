import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import Navigation from './config/routes'

ReactDOM.render(
	<Router history={browserHistory}
	routes={Navigation}
	/>, 
	document.getElementById('root'));
