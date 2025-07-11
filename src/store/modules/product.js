const state = {
    user: null,
};

const mutations = {
};

import axios from '../axios'
const actions = {
    async getAll({ commit }, params) {
        if(params && params.productIds){
            params = Object.assign(...params, {ids: params.productIds})
            // if(params.productIds) {
            //     query += `ids=${params.productIds}`
            // }
        }
        return (await axios.get(`/products`, {params: params}))?.items
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