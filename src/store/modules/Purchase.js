import { reqPurchaseTop, reqWaterfallData } from '../../ajax/index'
//值得买组件vuex
const state = {
    // 获取小图
    topData: [],
    //瀑布流数据 
    waterfallData: []
}

const mutations = {
    RECEIVE_TOPDATA(state, data) {
        state.topData = data
    },
    RECEIVE_WATERFALLDATA(state, data) {
        state.waterfallData = data
    }
}
const actions = {
    async getTopData({ commit }) {
        const result = await reqPurchaseTop()
        if (result.code == 200) {
            commit('RECEIVE_TOPDATA', result.data)
        }
    },
    async getWaterfallData({ commit }, page) {
        const result = await reqWaterfallData(page)
        if (result.code == '200') {
            commit('RECEIVE_WATERFALLDATA', result.data)
        }

    }
}
const getters = {
    gettotal() {
        return state.topData.navList
    },
    leftData() {
        if (state.waterfallData.result) { return state.waterfallData.result[0].topics } return []

    },
    rightData() {
        if (state.waterfallData.result) { return state.waterfallData.result[1].topics } return []
    }
}
export default {
    state,
    actions,
    getters,
    mutations
}