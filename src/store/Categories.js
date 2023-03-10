export const state = () => {
  categories: []
}

export const mutations = {
  setCategory(state, categoriesList) {
    state.categories = categoriesList
  }
}

export const actions = {
  async fetchCategories(
    {commit},
    {search},
  ) {
    return await new Promise((resolve, reject)=> {
      this.$api
        .get('/product/get-product-types')
        .then((res)=> {
          commit('setCategory', res.data)
          resolve()
        })
        .catch((error)=>{
          reject(error)
        })
    })
  }
}
