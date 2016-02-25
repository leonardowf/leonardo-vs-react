import React, { Component, PropTypes } from 'react'
import EditableRow from './EditableRow'
// import AddTwoValuesForm from './AddTwoValuesForm'
import { connect } from 'react-redux'
import { actions as recipeSizesActions } from '../../redux/modules/recipeSize'

class SizesList extends Component {
  static propTypes = {
    recipeSizes: PropTypes.array.isRequired,
    createRecipeSize: PropTypes.func.isRequired,
    fetchRecipeSizes: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props)

    this.recipeSizesToRows = this.recipeSizesToRows.bind(this)
    this.onSubmitFormSize = this.onSubmitFormSize.bind(this)
  }

  componentWillMount () {
    this.props.fetchRecipeSizes()
  }

  onSubmitFormSize (sizeName) {
    this.props.createRecipeSize(sizeName)
  }

  recipeSizesToRows () {
    const allowRemoval = this.props.recipeSizes && this.props.recipeSizes.length > 1
    let components = this.props.recipeSizes.map(
      (recipeSize) => (
        <EditableRow
          key={recipeSize.id}
          name={recipeSize.name}
          description={recipeSize.slices}
          payload={recipeSize}
          allowRemoval={allowRemoval} />
      )
    )
    return components
  }

  render () {
    return (
      <div className='sizes-container'>
        <h1>Tamanhos</h1>
        <p>Crie os tamanhos personalizados da sua pizzaria.</p>
        <div className='table-container'>
          <table>
            <tbody>
              {this.recipeSizesToRows()}
            </tbody>
          </table>
        </div>

        {/*<AddTwoValuesForm onSubmitForm={this.onSubmitFormSize} placeholders={['Nome do tamanho...', 'Número de fatias...']} />*/}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    recipeSizes: state.recipeSize.all,
    loading: state.recipeSize.loading
  }
}

export default connect(mapStateToProps, recipeSizesActions)(SizesList)
