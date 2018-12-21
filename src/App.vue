<template>
  <div id="app">
        <div id="nav">
      <!-- <router-link to="/">Home</router-link> | -->
      
      
      <!-- <router-link to="/main">main</router-link>  -->
      
      
      <!-- <router-link to="/about">About</router-link>| -->
      <!-- <router-link to="/page1">page1</router-link>|
      <router-link to="/spending">spending</router-link> -->
       <!-- <router-link to="/WeekView">WeekView</router-link> -->
      <!-- <router-link to="/analytics">MonthlyAnalytics</router-link> -->
          <!-- <MonthlyAnalytics></MonthlyAnalytics> -->
      <!-- <router-link to="/input_spending">Input Spending</router-link> -->
        </div>

        <main></main>
        <router-view></router-view>
    </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import MonthlyAnalytics from './components/analytics.vue'
import main from './components/main.vue'
import page1 from './components/page1.vue'
import spending from './components/spending.vue'
import input_spending from './components/input_spending.vue'
// import WeekView from './components/WeekView.vue'

export default {
  name: 'App',
  components: {
    page1,
    main,
    spending,
    // WeekView,
    MonthlyAnalytics,
    input_spending,
  },

    // methods: {
    //    goHome() {
    //         // Do some stuff here
    //         this.$route.router.go('./components/main.vue');
    //     }
    // }

}

</script>

<style>
start {
  text-align: center;
}
/* #nav {
  font-size: 100px;
  text-align: center;
  margin-top: 150px;
} */
/* #starttext {
  font: 100px;
} */
</style>