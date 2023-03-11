import axios from "axios";
export async function fetchCategories ({commit}) {
  return await new Promise ((resolve, reject) => {
    axios
      .get('/product/get-product-types')
      .then((res)=> {
        if(res.status === 200) {
          commit('setCategories', res.data)
        }
      })
      .catch((error)=> {
        console.log(error)
      })
  })
}


