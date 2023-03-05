export const getMinMax = (array) => {
  if (!array) return []
  const maxItem = array.reduce((previous, current) => {
    return current.price > previous.price ? current : previous
  })
  const maxPrice = maxItem.price

  const minItem = array.reduce((previous, current) => {
    return current.price < previous.price ? current : previous
  })
  const minPrice = minPrice
  return `${minPrice} - ${maxPrice}`
}
