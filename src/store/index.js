import Vue from "vue"
import Vuex from "vuex"

import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex);

import songModule from "./Modules/songModule"

const state = {}

const mutations = {}

const actions = {}

export default new Vuex.Store({
    modules: {
        songModule: songModule
    },
    state,
    mutations,
    actions,
    plugins: [
        createPersistedState({
            storage: window.sessionStorage,
        })
    ]
})
