<template>
  <form @submit.prevent.stop="onSubmit"
         class="wrapper q-gutter-md">
  <q-input v-model="name_uz" label="Name"
           ref="name_uz"
             lazy-rules
             :rules="[ val => val && val.length > 0 || 'Please type something', val => val.length <= 20 || 'Please use maximum 20 characters']"
    />
    <q-input v-model="cost" label="Cost" mask="###" ref="cost"
      :rules="[val => val && val.length > 0 || 'Please type number' ]"
       />
    <q-input v-model="address" label="Address" ref="address"
             :rules="[ val => val && val.length > 0 || 'Please type something', val => val.length <= 20 || 'Please use maximum 20 characters']" />
    <q-select v-model="product_type_id"
              :rules="[val => val && val.id || 'Select something' ]"
              ref="product_type_id"
              label="Select product category"
              :options="$props.dropdownOptions"
              :options-value="(item) => item.id ? item.id : null"
              :option-label="(item)=> item.name_uz ? item.name_uz : null" />
    <div class="form-actions row justify-between">
      <q-btn label="Cancel" color="red" @click="$emit('closeModal')" />
      <q-btn label="Submit" type="submit"  color="secondary" />
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      name_uz:   "",
      product_type_id:  {},
      cost: '',
      address:   "",
      id: 0
    }
  },
  props: {
    dropdownOptions: {
      type: Array,
    },
    formDefaultData: {
      type: Object
    }
  },
  mounted() {
    console.log('mounted', this.$props.formDefaultData)
    if(this.$props.formDefaultData.name_uz) {
      this.name_uz = this.$props.formDefaultData.name_uz
      this.product_type_id = this.$props.formDefaultData.product_type_id
      this.cost = String(this.$props.formDefaultData.cost)
      this.address = this.$props.formDefaultData.address
      this.id = this.$props.formDefaultData.id
    }
  },
  computed: {
    formatFormData: function (data) {
      console.log(data)
      return (data) => ({...data, product_type_id: data.product_type_id.id})
    }
  },
  methods: {
    onSubmit() {
      this.$refs.name_uz.validate()
      this.$refs.cost.validate()
      this.$refs.address.validate()
      this.$refs.product_type_id.validate()

      if (this.$refs.name_uz.hasError || this.$refs.cost.hasError || this.$refs.address.hasError || this.$refs.product_type_id.hasError) {
        this.formHasError = true
      }
      else {
        const formData = {
          name_uz: this.name_uz,
          product_type_id: this.product_type_id.id,
          cost: Number(this.cost),
          address: this.address,
          created_date: Date.parse(new Date())
        }
        if(this.$props.formDefaultData.id) {
          formData.id = this.$props.formDefaultData.id
        }
        this.$emit('submitFormModal', formData, this.$props.formDefaultData.id ? 'put' : 'post')
        this.$emit('closeModal')
      }
    },


  }
}
</script>

<style scoped lang="sass">
.wrapper
  padding: 40px 20px

.form
  &-actions
    margin-top: 20px
</style>
