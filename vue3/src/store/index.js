import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'

Vue.use(Vuex)

const itemModule = {
  namespaced: true,
  state: {
    categories: [],
    currentCatId: '1',
    items: []
  },
  mutations: {
    SET_CURRENT_CAT_ID (state, categoryId) {
      state.currentCatId = categoryId
    },
    SET_CATEGORIES (state, categories) {
      state.categories = categories
    },
    SET_ITEMS (state, items) {
      state.items = items
    }
  },
  actions: actions,
  getters: {
    sortedItemsByCat (state) {
      const currentCatId = state.currentCatId
      return state.items.filter((item) => {
        return item.category_id === Number(currentCatId)
      })
    }
  }
}

export default new Vuex.Store({
  modules: {
    itemModule: itemModule
  }
})
