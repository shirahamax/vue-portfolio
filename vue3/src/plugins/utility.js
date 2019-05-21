import Vue from 'vue'

const Utility = {
  install (Vue) {
    // 価格のフォーマット
    Vue.prototype.$formatPrice = (price) => {
      if (typeof price === 'number') return '¥' + price.toLocaleString('ja-JP')
    }
  }
}

Vue.use(Utility)
