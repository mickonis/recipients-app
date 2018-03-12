import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import promise from 'redux-promise'

import reducers from './reducers/rootReducer'
import RecipientsBox from './components/recipientsBox'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore)

const App = () => (
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" component={RecipientsBox} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
)

export default App
