import mockAjax from './mockAjax'
//首页数据
export const reqHome = ()=>mockAjax.get('/home')
// 获取nav
export const reqNavList = ()=>mockAjax.get('/navlist')
// 首页点击nav后的详情数据
export const reqDetails = ()=>mockAjax.get('/details')
// 分类组件获取数据接口
export const reqCateNavDatas = ()=>mockAjax.get('/category')