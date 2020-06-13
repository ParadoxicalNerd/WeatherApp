import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from "redux-thunk";

import { reducer } from './redux/reducers'

let middleware = applyMiddleware(thunk)

// Adds React and Redux Devtools to middleware
if (process.env.NODE_ENV === 'development') {
    middleware = compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
}

// Creates Redux Store
const store = createStore(
    reducer,
    middleware

);

// Ensures that store is available to the main app
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)