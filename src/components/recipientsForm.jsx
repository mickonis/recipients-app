import React, {Component} from 'react'
import _ from 'lodash'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { createRecipient, updateRecipient } from '../actions/recipients'

class RecipientForm extends Component {
  componentDidMount() {
    this.resetForm()
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.selectedRecipient !== nextProps.selectedRecipient){
      this.props.initialize(nextProps.selectedRecipient)
    }
  }

  resetForm() {
    this.props.reset()
    this.props.initialize({
      country: 0,
      recipientType: 'person',
      firstName: '',
      lastName: '',
      businessName: '',
    })
  }

  renderField(field){
    const { meta: { touched, error } } = field
    const className =`${field.type !== 'radio' ? 'form__group': 'form__radio'} ${touched && error ? 'form__group--error' : ''}`
    const countries = field.options

    return(
      <div className={className}>
        <label className="form__label">{field.label}</label>

        {field.type === 'select' &&
          <select className="form__control form__control--select" {...field.input} >
            <option value="0" disabled>Please select</option>
            {
              _.map(countries, country => <option key={country.code} value={country.name}>{country.name}</option>)
            }
          </select>
        }
        {field.type !== 'select' &&
          <input
            className="form__control"
            type={field.type}
            {...field.input}
          />
        }

        <div className="form__error">
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  onSubmit(values) {
    if(this.props.selectedRecipient){
      console.log(values)
      this.props.updateRecipient(values._id, values, () => {
        this.resetForm()
      })
    }else{
      this.props.createRecipient(values)
    }
    this.resetForm()
  }

  render() {
    const { handleSubmit } = this.props
    const isPerson = this.props.recipientType === "person" ? true : false
    const countries = this.props.countries

    if(!this.props.recipientType){
      this.resetForm()
    }

    return (
      <div className="form">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Country"
            name="country"
            type="select"
            options={countries}
            component={this.renderField}
          />
          <div className="form__group form__group--row">
            <Field
              label="Person"
              name="recipientType"
              type="radio"
              value="person"
              component={this.renderField}
            />
            <Field
              label="Business"
              name="recipientType"
              type="radio"
              value="business"
              component={this.renderField}
            />
          </div>
          {isPerson &&
            <Field
              label="First name"
              name="firstName"
              type="text"
              component={this.renderField}
            />
          }
          {isPerson &&
            <Field
              label="Last name"
              name="lastName"
              type="text"
              component={this.renderField}
            />
          }
          {!isPerson &&
            <Field
              label="Business name"
              name="businessName"
              type="text"
              component={this.renderField}
            />
          }
          <button
            type="submit"
            className="button button--success">
              Submit
          </button>
        </form>
      </div>
    )
  }
}

function validate(values) {
  const { country, firstName, lastName, businessName, recipientType } = values
  const errors = {}

  if(country == "0"){
    errors.country = "Select a country!"
  }

  if( recipientType === 'person' && (!firstName || firstName === "" || firstName.length < 2 || firstName.length > 30)){
    errors.firstName = "Enter a first name between 2 and 30 symbols!"
  }

  if( recipientType === 'person' && (!lastName || lastName === "" || lastName.length < 2 || lastName.length > 30)){
    errors.lastName = "Enter a last name between 2 and 30 symbols!"
  }

  if( recipientType === 'business' && (!businessName || businessName === "" || businessName.length < 2 || businessName.length > 30)){
    errors.businessName = "Enter a business name between 2 and 30 symbols!"
  }

  return errors
}

const selector = formValueSelector('RecipientNewForm')

export default reduxForm({
  validate,
  form: 'RecipientNewForm',
})(
  connect(
    state => {
      const recipientType = selector(state, 'recipientType')
      return {
        recipientType
      }
    }, { createRecipient, updateRecipient })(RecipientForm)
)
