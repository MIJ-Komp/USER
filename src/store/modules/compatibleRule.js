import axios from '../axios'

const state = {
    user: null,
};

const mutations = {
};

const actions = {
    async getAll({ commit }, params) {
        return await axios.get('/compatibility-rules', {params : params})
    },
    async getById({commit}, id){
        return await axios.get(`/compatibility-rules/${id}`)
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