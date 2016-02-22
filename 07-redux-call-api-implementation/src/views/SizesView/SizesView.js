import React, { PropTypes, Component } from 'react';

import SizesList from './SizesList'

export default class SizesView extends Component {
  render() {
    return (
      <div>
        <SizesList />

        <div className='sizes-container'>
          <h1>Categorias</h1>
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

        <div className='sizes-container'>
          <button>Salvar</button>
          <button>Descartar alterações</button>
        </div>
      </div>
    )
  }
}
