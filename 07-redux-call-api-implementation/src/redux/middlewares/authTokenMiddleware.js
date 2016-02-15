import { SIGNUP } from '../modules/login'

export default (store) => (next) => (action) => {
  console.log('na minha middleware')
  console.log(action)

  console.log(SIGNUP)

  if (action.type === SIGNUP) {
    console.log('Minha middleware para signup actions')
  }

  return next(action)
}
