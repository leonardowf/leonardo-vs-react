import React, { Component, PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import EditableRow from './EditableRow'
import AddValueForm from './AddValueForm'

export default class SizesList extends Component {

  onSubmitFormSize(sizeName) {
    console.log(sizeName)
  }

  render () {
    return (
      <div className='sizes-container'>
        <h1>Tamanhos</h1>
        <p>Crie os tamanhos personalizados da sua pizzaria.</p>
        <div className='table-container'>
          <table>
            <tbody>
              <EditableRow />
              <EditableRow />
            </tbody>
          </table>
        </div>

        <AddValueForm onSubmitForm={this.onSubmitFormSize}/>
      </div>
    )
  }
}
