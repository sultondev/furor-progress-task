<template>
  <div>
    <div class="category-head row justify-between">
      <div class="category__title items-center" v-if="categoryInfo.name_uz">
        {{  categoryInfo.name_uz  }}
      </div>
      <q-btn color="primary" class="products__create" @click="openCreateModal" size="12px" label="Create Item" />
    </div>
    <div class="products-wrapper row
    wrap justify-between" v-if="categoryProductList.length > 0">
      <q-card v-for="category in categoryProductList" :key="category.id" class="my-card">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">
            {{category.name_uz}}
          </div>
          <div class="text-subtitle2">
            {{category.cost}} $
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="left">
          <q-btn color="secondary" @click="openEditModal(category.id)" label="Edit" />
          <q-btn color="red" @click="deleteCategoryItem(category.id)">
            Delete
            <template v-slot:loading>
              Loading...
            </template>
          </q-btn>
        </q-card-actions>
      </q-card>

    </div>
    <div v-else class="row column items-center justify-center">
      <img src="~assets/empty-no-data.svg"
           style="width: 200px; height: 200px"
           alt="">
      <h6>
        Empty product type
      </h6>
    </div>
    <q-dialog v-model="isModalOpen" persistent>
      <q-card style="min-width: 350px">
        <FormModal :bla="Math.random() * 80" @submitFormModal="submitData"
                   @closeModal="closeModal"
                   :form-default-data="selectedProduct"
                   :dropdown-options="formDropdownOptions" />
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import {categoriesListGetter} from "src/store/categories-list-module/getters";
import FormModal from "components/FormModal.vue";
  export default {
    components: {FormModal},
    data() {
      return {
        allProductList: [],
        isModalOpen: false,
        selectedProduct: {
          name_uz: null,
          id: null,
          cost: null,
          address: null,
          product_type_id: null,
          created_date: null
        }
      }
    },
    props: {
      id: {
        type: String
      }
    },
    created() {
      this.fetchCategoriesProducts()
    },
    computed: {
      ...mapGetters({
        categoriesListGetter: 'category/categoriesListGetter',
        getCategoryListItemById: "category/getCategoryItemById",
        doesCategoryExist: 'category/doesCategoryItemExist'
      }),
      categoryProductList: function() {
        return this.allProductList.filter(item => item.product_type_id == this.$route.params.id) || []
      },
      getCategoryProductItemById: function() {
        return (id) => {
          const idx = this.allProductList.findIndex((item) => item.id == id)
          return this.allProductList[idx]
        }
      },
      categoryInfo: function () {
        return this.getCategoryListItemById(this.$route.params.id) || {}
      },
      // doesCategoryExist: function () {
      //   return this.categoriesListGetter.some(item=> item.id == this.$route.params.id)
      // },
      formDropdownOptions: function () {
        return this.categoriesListGetter.map(item => ({name_uz: item.name_uz, id: item.id}))
      },
    },
    methods: {
      submitData(data, method) {
        if(method === 'put') {
          this.$api.put('/product', data)
            .then((res) => {
              if(res.status === 200) {
                this.cleanSelectedProduct()
                this.fetchCategoriesProducts()
              }
            })
        } else {
          this.$api.post('/product', data)
            .then((res) => {
              this.fetchCategoriesProducts()
            })
          }
      },
      fetchCategoriesProducts() {
        this.$api
          .get('/product')
          .then((res)=>{
            if(res.status === 200) {
              this.allProductList = res.data
              if(this.doesCategoryExist(this.$route.params.id)) {
                this.categoryProductList = res.data.filter((item)=> item.product_type_id == this.$props.id)
              } else {
                this.$router.push('/not-found')
              }
            } else {
              this.$router.push('/not-found')
            }
          })
          .catch((error)=>{
            console.log(error)
            this.$router.push('/not-found')
          })
      },
      deleteCategoryItem(id) {
        this.$api.delete(`/product/${id}`)
          .then(res=>{
            if(res.status === 200) {
              this.fetchCategoriesProducts()
            }
          })
      },
      openEditModal(id) {
        this.isModalOpen = true
        const productItem = this.getCategoryProductItemById(id)
        this.selectedProduct.id = productItem.id
        this.selectedProduct.name_uz = productItem.name_uz
        this.selectedProduct.cost = productItem.cost
        this.selectedProduct.address = productItem.address
        this.selectedProduct.created_date = productItem.created_date
        const category = this.getCategoryListItemById(productItem.product_type_id)
        this.selectedProduct.product_type_id = {name_uz: category.name_uz, id: category.id}
      },
      openCreateModal() {
        this.isModalOpen = true
      },
      closeModal() {
        this.isModalOpen = false
        this.cleanSelectedProduct()
      },
      cleanSelectedProduct() {
        this.selectedProduct.id = null
        this.selectedProduct.name_uz = null
        this.selectedProduct.cost = null
        this.selectedProduct.address = null
        this.selectedProduct.product_type_id = null
        this.selectedProduct.created_data = null
      },
    },
    watch: {
      $route() {
        if(this.doesCategoryExist(this.$route.params.id)) {
        } else {
          this.$router.push('/not-found')
        }
      }
    }
  }
</script>

<style scoped lang="sass">
.products
  &-wrapper
    max-width: 94%
    margin: 0 auto
    gap: 20px

    .my-card
      min-width: 300px
  &__create

.category
  &-head
    margin: 20px 30px
  &__title
    font-size: 26px
</style>
