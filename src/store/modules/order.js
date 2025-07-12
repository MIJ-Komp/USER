const state = {
    user: null,
};

const mutations = {
};

import axios from '../axios'
const actions = {
    async create({ commit }, payload) {
        return await axios.post(`/orders`, payload)
    },
    async getByCode({commit}, code){
        return await axios.get(`/orders/${code}`)
    }
};

const getters = {
    user: (state) => state.user,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};