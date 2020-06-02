import Category from '../pages/Category'
import Home from '../pages/Home'
import Purchase from '../pages/Purchase'
import ShopCar from '../pages/ShopCar'
import Self from '../pages/Self'
import Search from '../pages/search'
import SearchValue from '../pages/search/SearchValue'
import Login from '../pages/Login'


export default [
    // 主页
    {
        path: '/home/:id?',
        name: '/',
        component: Home
    },
    {
        path: '/purchase',
        name: 'purchase',
        component: Purchase
    },
    {
        path: '/shopcar',
        name: 'shopCar',
        component: ShopCar
    },
    {
        path: '/self',
        name: 'self',
        component: Self
    },
    //分类页面左侧的导航
    {
        path: '/category/:id?',
        name: 'category',
        component: Category
    },
    {
        path: '/search',
        name: 'search',
        component: Search
    },
    {
        path: '/search/value',
        name: 'searchvalue',
        component: SearchValue
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },

    {
        path: '/',
        redirect: '/home'
    }
]