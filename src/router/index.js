import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
// 给成功的回调函数指定一个默认为空的的函数参数即可
VueRouter.prototype.push = function (location, onComplete = () => { }, onAbort) {
    return originPush.call(this, location, onComplete, onAbort)
}
// 给失败的回调函数指定一个默认为空的函数参数即可
VueRouter.prototype.replace = function (location, onComplete, onAbort = () => { }) {
    return originReplace.call(this, location, onComplete, onAbort)
}
Vue.use(VueRouter)
const router = new VueRouter({
    mode: 'history',
    routes,
    //一进来就在顶部
    scrollBehavior(to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    }
})
router.beforeEach((to, from, next) => {
    const targetPath = to.path
    const token = localStorage.getItem('touken')
    if (targetPath === '/self') {
        if (token) {
            next()
        } else {
           alert('请先登录')
            next('/login?redirect=' + targetPath)
        }
    } else {
        next()
    }

})


export default router