import { reqHome } from '../../ajax/index'

const state = {
    homeData: {}
}
    // 这里请求的是轮播图下面的内容
const mutations = {
    RECEIVE_HOMEDATA(state, data) {
        state.homeData = data
    }
}
const actions = {
    async getHomeData({ commit }) {
        const result = await reqHome()
        if (result.code === 200) {
            commit('RECEIVE_HOMEDATA', result.data)
        }
    }
}
const getters = {
    carousel(state) {
        return state.homeData.focusList
    },
    policyDescList(state) {
        return state.homeData.policyDescList
    },
    kingKongModule(state) {
        return state.homeData.kingKongModule
    }
}
export default {
    state,
    actions,
    getters,
    mutations
}