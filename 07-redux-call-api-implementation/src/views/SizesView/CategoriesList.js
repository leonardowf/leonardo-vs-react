import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import AddValueForm from './AddValueForm'
import { actions as recipeCategoriesActions } from '../../redux/modules/recipeCategory'
import RecipeCategoryEditableRow from './RecipeCategoryEditableRow'
import { actions as recipeSizesCategories } from '../../redux/modules/recipeCategory'

class CategoriesList extends Component {
  constructor(props) {
    super(props)

    this.recipeCategoriesToRows = this.recipeCategoriesToRows.bind(this)
    this.onSubmitFormCategory = this.onSubmitFormCategory.bind(this)
  }

  componentWillMount () {
    this.props.fetchRecipeCategories()
  }

  recipeCategoriesToRows () {
    const allowRemoval = this.props.recipeCategories && this.props.recipeCategories.length > 1
    let components = this.props.recipeCategories.map(
      (recipeCategory) => (
        <RecipeCategoryEditableRow
          key={recipeCategory.id}
          name={recipeCategory.name}
          payload={recipeCategory}
          allowRemoval={allowRemoval} />
      )
    )
    return components
  }

  onSubmitFormCategory (categoryName) {
    this.props.createRecipeCategory(categoryName)
  }

  render() {
    return (
      <div className='sizes-container'>
        <h1>Categorias</h1>
        <p>Crie os tamanhos personalizados da sua pizzaria.</p>
        <div className='table-container'>
          <table>
            <tbody>
              {this.recipeCategoriesToRows()}
            </tbody>
          </table>
        </div>

        <AddValueForm onSubmitForm={this.onSubmitFormCategory} placeholder='Digite o nome da categoria...'/>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    recipeCategories: state.recipeCategory.all
  }
}

export default connect(mapStateToProps, recipeCategoriesActions)(CategoriesList)
