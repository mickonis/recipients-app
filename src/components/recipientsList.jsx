import React, { Component } from 'react'
import _ from 'lodash'

class RecipientsList extends Component {

  renderRecipients() {
    const { removeRecipient, setSelected, list } = this.props

    if (_.keys(this.props.list).length > 0) {
      return _.map(list, recipient => {
        const {firstName, lastName, businessName, recipientType, country, _id} = recipient

        return(
          <li key={_id} className="recipients__item">
            <div className="recipients__details">
              <div className="recipients__title">{recipientType === 'person' ? `${firstName} ${lastName}`  : businessName}</div>
              <div className="recipients__subtitle">Country:</div>
              <div className="recipients__text">{country}</div>
            </div>
            <div className="recipients__actions">
              <div className="button" onClick={() => setSelected(_id)}>Edit</div>
              <div className="button" onClick={() => removeRecipient(_id)}>Delete</div>
            </div>
          </li>
        )
      })
    } else {
      return <li className="recipients__item">No recipients</li>
    }
  }

  render() {

    return (
      <div className="recipients">
        <div className="recipients__heading">EXISTING RECIPIENTS:</div>
        <ul className="recipients__list">
          {this.renderRecipients()}
        </ul>
      </div>
    )
  }
}

export default RecipientsList
