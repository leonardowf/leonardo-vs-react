const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

export default isNumber
