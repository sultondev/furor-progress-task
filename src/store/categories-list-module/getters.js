export function categoriesListGetter (state) {
  return state.categoriesList
}

export function getCategoryItemById(state) {
  return (id) =>  {
    const idx = state.categoriesList.findIndex(item => item.id == id)
    return state.categoriesList[idx]
  }
}

export function doesCategoryItemExist(state) {
  return (id) => {
    return state.categoriesList.some(item => item.id == id)
  }
}
