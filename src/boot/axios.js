import Vue from 'vue'
import axios from 'axios'

const BASE_CONFIG = {
  baseURL: 'http://94.158.54.194:9092/api',
  headers: {
    "Content-Type": "application/json",
  },
}

axios.defaults.baseURL='http://94.158.54.194:9092/api'
Vue.prototype.$api = axios.create({...BASE_CONFIG})
Vue.prototype.$axios = axios
