import Vue from 'vue'
import Vuex from 'vuex'
import patient from "./modules/patientModule"
import vaccine from "./modules/vaccineModule"
import vaccineManager from "./modules/vaccineManagerModule"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    patient,
    vaccine,
    vaccineManager
  }
})
