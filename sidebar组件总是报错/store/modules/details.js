import { reqNavList } from '../../ajax/index'
import Vue from 'vue'
const state = {
    navList: [],
    lunbotu: []
}

const mutations = {
    RECEIVE_NAVLIST(state, data) {
        state.navList = data
    },
    RECEIVE_LUNBOTU(state, data) {

        state.lunbotu = data.lunbotu
    }
}

const actions = {
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
    }
}
const getters = {
    getNavList(state) {
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