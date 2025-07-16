const state = {
    menus: null,
};

const mutations = {
    setMenus(state, menus){
        state.menus = menus
    }
};

import axios from '../axios'
const actions = {
    async getAll({ commit }) {
        const menus =  (await axios.get('/menus'))
        commit("setMenus", menus);
        return menus
    },
};



const getters = {
    menus: (state) => state.menus,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};