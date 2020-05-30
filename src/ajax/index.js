import mockAjax from './mockAjax'
import ajax from './ajax'
//首页数据
export const reqHome = () => mockAjax.get('/home')
// 获取nav
export const reqNavList = () => mockAjax.get('/navlist')
// 首页点击nav后的详情数据
export const reqDetails = () => mockAjax.get('/details')
// 分类组件获取数据接口
export const reqCateNavData = () => mockAjax.get('/category')
//获取点击分页裂变左侧nav右边应该显示的数据的接口
export const reqCateLists = () => mockAjax.get('/cateLists')



//值得买真实接口
export const reqPurchaseTop = () => ajax.get('/know/navWap.json')

//请求值得买瀑布流数据
export const reqWaterfallData = (page) => ajax.get(`/find/recAuto.json?page=${page}&size=2`)




