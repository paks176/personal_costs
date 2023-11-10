import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        data: [],
    },
    actions: {
        getRecordsList(context) {
            fetch('https://run.mocky.io/v3/95abb8d5-3ee5-49df-9c49-07d91a6852b2')
                .then(data => {
                    data.json()
                    .then(result => {
                        context.commit('writeOldRecords', result)
                    })
                })
        }
    },
    mutations: {
        writeOldRecords(state, list) {
            state.data = list.data;
        }
    },
    getters: {
        getRecordsFromState(state) {
            console.log(state.data)
            return state.data;
        }
    },
})