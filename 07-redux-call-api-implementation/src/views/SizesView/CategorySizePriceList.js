import React, { Component } from 'react'
import { connect } from 'react-redux'

class CategorySizePriceList extends Component {
  componentWillReceiveProps (nextProps) {
    if (nextProps.dirty) {
      console.log('tah sujo')
    }
  }

  render () {
    return (
      <div className='sizes-container'>
        <h1>Categorias x Tamanho e Preço</h1>
        <p>Crie os tamanhos personalizados da sua pizzaria.</p>
        <div className='table-container'>
          <table>
            <tbody>
              <tr>
                <td>Jill</td>
                <td>Smith</td>
                <td>50</td>
              </tr>
              <tr>
                <td>Eve</td>
                <td>Jackson</td>
                <td>94</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dirty: state.categorySize.dirty
  }
}

export default connect(mapStateToProps, null)(CategorySizePriceList)
