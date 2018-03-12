import _ from 'lodash'
import { FETCH_RECIPIENTS, SET_RECIPIENT, DELETE_RECIPIENT, CREATE_RECIPIENT, UPDATE_RECIPIENT, FETCH_COUNTRIES} from '../actions/recipients'

const INITIAL_STATE = {
  recipients: {},
  selectedRecipientId: null,
  countries: {},
  loading: true
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_RECIPIENTS:
      return { ...state, recipients: _.mapKeys(action.payload.data, '_id'), loading: false }
    case SET_RECIPIENT:
    console.log(action)

      return { ...state, selectedRecipientId: action.id }
    case DELETE_RECIPIENT:
      return { ...state, recipients: _.omit(state.recipients, [action.payload]) }
    case CREATE_RECIPIENT:
      return { ...state, recipients: { ...state.recipients, [action.payload.data._id]: action.payload.data }, selectedRecipientId: null }
    case UPDATE_RECIPIENT:
      return { ...state, recipients: { ...state.recipients, [action.payload.data._id]: action.payload.data }, selectedRecipientId: null }
    case FETCH_COUNTRIES:
      return { ...state, countries: action.payload.data }
    default:
      return state
  }
}
