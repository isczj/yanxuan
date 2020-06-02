import { reqHome, reqNavList, reqSearchData } from '../../ajax/index'
const state = {
    homeData: {},
    navList: [],
    lunbotu: [],
    searchData: []
}
// 这里请求的是轮播图下面的内容
const mutations = {
    RECEIVE_HOMEDATA(state, data) {
        state.homeData = data
    },
    RECEIVE_NAVLIST(state, data) {
        state.navList = data
    },
    RECEIVE_LUNBOTU(state, data) {
        state.lunbotu = data.lunbotu
    },
    //接收搜素后的数据
    RECEIVE_SEARCHDATA(state, data) {
        state.searchData = data
    }
}
const actions = {
    async getHomeData({ commit }) {
        const result = await reqHome()
        if (result.code === 200) {
            commit('RECEIVE_HOMEDATA', result.data)
        }
    },
    async getNavList({ commit }) {
        const result = await reqNavList()
        if (result.code === 200) {
            commit('RECEIVE_NAVLIST', result.data)
        }
    },
    async getLunbotu({ commit }) {
        const result = await reqNavList()
        if (result.code === 200) {
            const data = result.data[8]
            commit('RECEIVE_LUNBOTU', data)
        }
    },
    //搜素请求
    async getSearchData({ commit }, params) {
        const result = await reqSearchData(params)
        if (result.code == 200) {
            commit('RECEIVE_SEARCHDATA', result.data.directlyList)
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
    }, getNavList(state) {
        return state.navList
    },
    getLunbotu(state) {
        return state.lunbotu
    }
}
export default {
    state,
    actions,
    getters,
    mutations
}