import { reqCateNavData,reqCateLists } from '../../ajax/index'
const state = {
    // 获取分类组件左侧nav列表
    categoryList: [],
    rightData: []
} 

const mutations = {
    // 获取分类组件左侧nav列表
    RECEIVE_CATEGORYLIST(state, data) {
        state.categoryList = data
    }
    ,
    //获取点击分类左侧nav后边该显示的数据
    RECEIVE_RIGHTDATA(state, data) {
        state.rightData = data
    }
}

const actions = {
    // 获取分类组件左侧nav列表
    async getCategoryList({ commit }) {
        const result = await reqCateNavData()
        if (result.code === 200) {
            commit('RECEIVE_CATEGORYLIST', result.data)
        }

    },
    //获取点击左侧nav后右边应该显示的数据
    async getRightData({ commit }) {
        const result = await reqCateLists()
        if (result.code === 200) {
            commit('RECEIVE_RIGHTDATA', result.data)
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