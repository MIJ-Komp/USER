const state = {
    user: null,
};

const mutations = {
};

import axios from '../axios'
const actions = {
    async getAll({ commit }, params) {
        let query = "?"
        if(params){
            if(params.productIds) {
                query += `ids=${params.productIds}`
            }
        }
        return (await axios.get(`/products${query}`))?.items
    },
    async getById({commit}, id){
        return await axios.get(`/products/${id}`)
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