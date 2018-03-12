import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import RecipientsReducer from './recipients'

const rootReducer = combineReducers({
  recipientsState: RecipientsReducer,
  form: formReducer
})

export default rootReducer
