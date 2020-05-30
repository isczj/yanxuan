import { reqCateNavDatas } from '../../ajax/index'
const state = {
    // 获取分类组件左侧nav列表
    categoryList: []
}

const mutations = {
     // 获取分类组件左侧nav列表
    RECEIVE_CATEGORYLIST(state, data) {
        state.categoryList = data
    }
}

const actions = {
     // 获取分类组件左侧nav列表
    async getCategoryList({commit}){
        const result = await reqCateNavDatas()
        if(result.code ===200){
            commit('RECEIVE_CATEGORYLIST',result.data)
        }
   
    }
}
const getters = {

}
export default {
    state,
    actions,
    getters,
    mutations
}