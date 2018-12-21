import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import main from './components/main.vue'
import page1 from './components/page1.vue'
import spending from './components/spending.vue'
// import WeekView from './components/WeekView.vue'
import MonthlyAnalytics from './components/analytics.vue'
import inputSpending from './components/input_spending.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // },
    {
      path: '/',
      name: 'main',
      component: main
    },
    {
      path: '/page1',
      name: 'page1',
      component: page1
    },
    {
      path: '/spending',
      name: 'spending',
      component: spending
    },
    // {
    //   path: '/WeekView',
    //   name: 'WeekView',
    //   component: WeekView
    // },
    {
      path: '/analytics',
      name: 'analytics',
      component: MonthlyAnalytics
    },
    {
      path: '/input_spending',
      name: 'input_spending',
      component: inputSpending
    }

  ]
})
