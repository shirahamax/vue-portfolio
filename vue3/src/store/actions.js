import axios from 'axios'
import router from '../router'

let host = 'https://asia-northeast1-shirahamax-portfolio.cloudfunctions.net/shop'

export default {

  /**
   * 選択したカテゴリID、またはURLで指定したカテゴリーIDをバリデートし、
   * ステートに保存します。
   * @param {*} { commit, state }
   * @param {String} categoryId
   */
  async setCurentCatId ({ commit, state }, categoryId) {
    if (!categoryId) return

    // バリデーション:0以上の整数の文字列型かどうか。
    let pattern = /^([1-9]\d*|0)$/
    if (!pattern.test(categoryId) ||
    typeof categoryId !== 'string') {
      router.push('/')
      throw new Error('CategoryId shoud be [0-9]:String.')
    }

    // 現在のカテゴリに指定のIDがあるか検索
    if (state.categories.filter(category => {
      return category.id === String(categoryId)
    }).length === 0) {
      router.push('/')
      throw new Error('Category not found::' + categoryId)
    }

    // カテゴリーのセット
    commit('SET_CURRENT_CAT_ID', categoryId)
    router.push({ path: './', query: { categoryId: categoryId }
    })
  },

  /**
   * カテゴリー一覧を取得します。
   * @param {*} { commit }
   */
  async getCategories ({ commit }) {
    await axios
      .get(host + '/categories')
      .then(response => {
        commit('SET_CATEGORIES', response.data.data)
      })
      .catch(err => { throw new Error(err) })
  },

  /**
   * 商品一覧を取得します。
   * @param {*} { commit }
   */
  async getItems ({ commit }) {
    await axios
      .get(host + '/items')
      .then(response => {
        commit('SET_ITEMS', response.data.data)
      })
      .catch(err => { throw new Error(err) })
  },

  /**
   * 指定された商品IDを取得、返却します。
   * @param {*} { commit }
   * @param {*} itemId
   * @returns
   */
  async getItemDetail ({ commit }, itemId) {
    let detail = {}

    // 商品詳細の取得
    await axios
      .get(host + '/items/' + itemId)
      .then(response => {
        detail = response.data
      })
      .catch(err => { throw new Error(err) })

    // 見つからない場合はNotFoundを表示
    if (detail == null) {
      router.replace('/notFound')
      throw new Error('Item not found. id:' + itemId)
    }
    return detail
  }
}
