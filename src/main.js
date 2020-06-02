import Vue from 'vue'
import App from './App.vue'
import vue from 'vue'
import router from './router'
import store from './store'
import { Button, List, cell, Tabbar, Tag, Toast, NavBar, Dialog, Loading, Lazyload, TabbarItem, Icon, Swipe, SwipeItem, Sidebar, SidebarItem } from 'vant';
import * as API from './ajax/index'
import './mock/mockServer'

//引入头部全局组件
import Top from './components/Top'
vue.use(Button)
vue.use(Tabbar)
vue.use(TabbarItem)
vue.use(Icon)
vue.use(Swipe)
vue.use(SwipeItem)
vue.use(Sidebar)
vue.use(SidebarItem)
vue.use(Tag)
vue.use(Loading)
vue.use(Lazyload)
vue.use(NavBar)
vue.use(Dialog)
vue.use(Toast)
vue.use(List)
vue.use(cell)
Vue.config.productionTip = false
Vue.prototype.$API = API

Vue.prototype.$bus = new Vue()
//注册全局组件
Vue.component('Top', Top)
new Vue({
  router,

  store,
  render: h => h(App),
}).$mount('#app')
