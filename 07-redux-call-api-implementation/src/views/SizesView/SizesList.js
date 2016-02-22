import React, { Component, PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import EditableRow from './EditableRow'

export default class SizesList extends Component {
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
              <tr>
                <td>Eve</td>
                <td>Jackson</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='add-form-container'>
          <form className="search-bar" role="search">
            <input type="search" placeholder="Digite o nome da categoria..." />
            <button type="submit">
              <FontAwesome name='plus' size='lg' style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }} />
            </button>
          </form>
        </div>
      </div>
    )
  }
}
