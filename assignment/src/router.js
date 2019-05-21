import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import NotFound from './views/NotFound.vue'
import ItemList from './components/ItemList.vue'
import ItemDetail from './components/ItemDetail.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/items/',
          name: 'list',
          alias: '/',
          component: ItemList,
          props: { categoryId: false }
        },
        {
          path: '/items/:id',
          name: 'detail',
          component: ItemDetail,
          meta: {
            hiddenFooter: true
          }
        }
      ]
    },
    {
      path: '*',
      name: 'notFound',
      component: NotFound
    }

  ]
})
