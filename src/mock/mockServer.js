import Mock from 'mockjs'

import home from './home.json'
import indexCateModule from './indexCateModule.json'
import cateNavDatas from './cateNavDatas.json'
import cateLists from './cateLists.json'
 //获取主页的数据
Mock.mock('/mock/home', { code: 200, message: '成功', data: home })
// 获取主页nav的数据
Mock.mock('/mock/navlist', { code: 200, message: '成功', data: indexCateModule })
// 获取分页左侧nav的数据
Mock.mock('/mock/category', { code: 200, message: '成功', data: cateNavDatas })
Mock.mock('/mock/cateLists', { code: 200, message: '成功', data: cateLists })
