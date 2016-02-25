import React, { Component } from 'react'

import SizesList from './SizesList'
import CategoriesList from './CategoriesList'
import CategorySizePriceList from './CategorySizePriceList'

export default class SizesView extends Component {
  render () {
    return (
      <div>
        <SizesList />
        <CategoriesList />
        <CategorySizePriceList />
        <div className='sizes-container'>
          <button>Salvar</button>
          <button>Descartar alterações</button>
        </div>
      </div>
    )
  }
}
