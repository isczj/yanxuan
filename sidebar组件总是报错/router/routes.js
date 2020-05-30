import Category from '../pages/Category'
import Home from '../pages/Home'
import Purchase from '../pages/Purchase'
import ShopCar from '../pages/ShopCar'
import Self from '../pages/Self'
import Details from '../pages/details'


export default [
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
    {
        path: '/category/:id?',
        name: 'category',
        component: Category
    },
    {
        path: '/details/:id?',
        name: 'details',
        component: Details
    }
]