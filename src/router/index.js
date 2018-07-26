import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Detail from '@/components/home/details/detail'
import Imgs from '@/components/home/detailImgs/imgs'
import Price from '@/components/home/price/price'
import Color from '@/components/home/detailImgs/color'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/",
      redirect:"/index"
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    },
    {
      path: '/imgs',
      name: 'imgs',
      component: Imgs
    },
    {
      path: '/price',
      name: 'price',
      component: Price
    },
    {
      path: '/color',
      name: 'color',
      component: Color
    }

  ]
})
