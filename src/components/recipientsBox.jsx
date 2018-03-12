import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchRecipients, deleteRecipient, setSelectedRecipient, fetchCountries } from '../actions/recipients'
import RecipientsList from './recipientsList'
import RecipientsForm from './recipientsForm'

class RecipientsBox extends Component {
  componentDidMount() {
    this.props.fetchRecipients()
    this.props.fetchCountries()
  }

  render() {
    const { setSelectedRecipient, deleteRecipient } = this.props
    const selectedRecipient = this.props.recipients[this.props.selectedRecipientId]
    console.log(this)

    return (
      <div className={this.props.loading ? "card card--loading" : "card"}>
        <h1 className="card__title">Recipients</h1>
        <RecipientsForm
          selectedRecipient={selectedRecipient || null}
          countries={this.props.countries} />
        <RecipientsList
          setSelected={(id) => setSelectedRecipient(id)}
          removeRecipient={(id) => deleteRecipient(id)}
          list={this.props.recipients}
          />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    recipients: state.recipientsState.recipients,
    selectedRecipientId: state.recipientsState.selectedRecipientId,
    countries: state.recipientsState.countries,
    loading: state.recipientsState.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchRecipients: () => dispatch(fetchRecipients()),
    deleteRecipient: id => dispatch(deleteRecipient(id)),
    setSelectedRecipient: id => dispatch(setSelectedRecipient(id)),
    fetchCountries: () => dispatch(fetchCountries())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipientsBox)
