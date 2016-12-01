import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory, hashHistory } from 'react-router'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import routes from './router/index'
import reducers from './redux/reducers/index'

const store = createStore(
    reducers,
    applyMiddleware(
        thunkMiddleware
    )
)

const render = () => ReactDOM.render(
    <Provider store={store}>
        <Router routes={routes} history={hashHistory} />
    </Provider>,
    document.getElementById('container')
)

render()