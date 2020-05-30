import { reqHome } from '../../ajax/index'

const state = {
    homeData: {}
}

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