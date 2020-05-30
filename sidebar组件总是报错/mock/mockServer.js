import Mock from 'mockjs'

import home from './home.json'
import indexCateModule from './indexCateModule.json'
import cateNavDatas from './cateNavDatas.json'

Mock.mock('/mock/home', { code: 200, message: '成功', data: home })
Mock.mock('/mock/navlist', { code: 200, message: '成功', data: indexCateModule })
Mock.mock('/mock/category', { code: 200, message: '成功', data: cateNavDatas })
