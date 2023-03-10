<template>
  <div class="col items-center">
    <q-item v-for="(categoryItem, idx) in categoriesList" :to="'/category/'+ categoryItem.id" :key="categoryItem[idx]">
      {{categoryItem.name_uz}}
    </q-item>
  </div>
</template>

<script>

import {listSorter} from "src/helpers";

export default {
  data() {
    return {
      categoriesList: []
    }
  },
  methods: {
    setCategories(data) {
      this.categoriesList = data
    },
    fetchCategories() {
      this.$api
        .get('/product/get-product-types')
        .then((res)=> {
          if(res.status === 200) {
            this.categoriesList = listSorter(res.data)
            this.$store.commit('category/setCategories', listSorter(res.data))
          }
        })
        .catch((error)=> {
          console.log(error)
        })
    }
  },
  created() {
    this.fetchCategories()
  }

}
</script>

<style scoped lang="sass">

.q-item
  min-height: fit-content
  min-width: fit-content

.q-router-link--active
  color: black
  transition: all 300ms linear

.q-router-link--exact-active
  color: var(--custom-primary)
  position: relative

.q-router-link--exact-active::after
  content: ""
  position: absolute
  transition: all 500ms ease
  width: 100%
  height: 2px
  background: var(--custom-primary)
  bottom: 0
  left: 0


</style>
