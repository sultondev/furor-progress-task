<template>
  <q-layout view="lHh Lpr lFf">
    <TheHeader />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import TheHeader from "../components/TheHeader.vue"
export default {
  name: 'MainLayout',
  components: {
    TheHeader
  },
  data () {
    return {
      leftDrawerOpen: false,
    }
  },
}
</script>


