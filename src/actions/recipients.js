import axios from 'axios'

export const FETCH_RECIPIENTS = 'fetch_recipients'
export const SET_RECIPIENT    = 'set_recipient'
export const CREATE_RECIPIENT = 'create_recipient'
export const UPDATE_RECIPIENT = 'update_recipient'
export const DELETE_RECIPIENT = 'delete_recipient'
export const FETCH_COUNTRIES = 'fetch_countries'

const ROOT_URL = 'http://localhost:3001'
const COUNTRIES_URL = 'https://rawgit.com/ryankane/d40364df707e9e600fcaa0bb645c762f/raw/95c865f7258e61e254a5b405d867e35de7530e61/countries.json'

export function fetchRecipients() {
  const request = axios.get(`${ROOT_URL}/recipients`)
    .then(data => {
      return data
    })
    .catch(error => {
      console.log(error)
    })

  return {
    type: FETCH_RECIPIENTS,
    payload: request
  }
}

export function setSelectedRecipient(id) {
  return {
    type: SET_RECIPIENT,
    id
  }
}

export function createRecipient(values) {
  const request = axios.post(`${ROOT_URL}/recipients`, values)
    .then(data => {
      console.log(data)
      return data
    })
    .catch(error => {
      console.log(error)
    })

  return {
    type: CREATE_RECIPIENT,
    payload: request
  }
}

export function updateRecipient(id, values, callback) {
  const request = axios.put(`${ROOT_URL}/recipients/${id}`, values)
    .then(data => {
      //console.log(data)
      callback()
      return data
    })
    .catch(error => {
      console.log(error)
    })

  return {
    type: UPDATE_RECIPIENT,
    payload: request
  }
}

export function deleteRecipient(id) {
  axios.delete(`${ROOT_URL}/recipients/${id}`)
    .then(data => {
      console.log(data)
      return data
    })
    .catch(error => {
      console.log(error)
    })

  return {
    type: DELETE_RECIPIENT,
    payload: id
  }
}

export function fetchCountries() {
  const request = axios.get(COUNTRIES_URL)
    .then(data => {
      return data
    })
    .catch(error => {
      console.log(error)
    })

  return {
    type: FETCH_COUNTRIES,
    payload: request
  }
}
