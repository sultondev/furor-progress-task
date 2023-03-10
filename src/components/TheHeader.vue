<template>
  <div>
  <q-header elevated class="layout-header">
    <q-toolbar class="row bg-white items-center text-black">
      <div class="col row justify-start">
        <q-btn dense flat round icon="menu" @click="left = !left" />
      </div>
      <div class="col row justify-center">
        <img src="../assets/logo.svg" class="w-[20px]" alt="">
      </div>
      <div class="col row justify-end">
        <q-item to="/" class="custom-link__home">Home</q-item>
      </div>
    </q-toolbar>
  </q-header>
  <q-drawer show-if-above v-model="left" side="left" bordered>
    <div class="navbar__title">Categories</div>
    <TheNavbar />
  </q-drawer>
  </div>
</template>

<script>
import TheNavbar from "../components/TheNavbar.vue"
export default {
  components: {
    TheNavbar
  },
  data () {
    return {
      left: false
    }
  }
}
</script>

<style lang="sass">
.navbar
  &__title
    margin: 20px 0 20px 20px
    font-size: 40px

.q
  &-item
    min-height: fit-content
    min-width: fit-content


  &-router-link--active, .custom-link__home
    color: black
    transition: all 300ms linear


.layout-header .q-layout__shadow:after
  box-shadow: none !important

</style>
