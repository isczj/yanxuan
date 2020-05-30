import Category from '../pages/Category'
import Home from '../pages/Home'
import Purchase from '../pages/Purchase'
import ShopCar from '../pages/ShopCar'
import Self from '../pages/Self'
import Details from '../pages/details'


export default [
    // 主页
    {
        path: '/',
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
    // 点击主页nav上面分类后的详情
    {
        path: '/details/:id?',
        name: 'details',
        component: Details
    }
]