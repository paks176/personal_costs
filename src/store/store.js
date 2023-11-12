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
                            window.test = result;
                            context.commit('writeOldRecords', result)
                        })
                })
        },
    },
    mutations: {
        writeOldRecords(state, list) {
            state.data = list.data;
        },
        addNewInState(state, record) {
            state.data.push(record)
        },
        makeSort(state, parameter) {
            state.data.sort(function (a, b) {
                switch (parameter) {
                    case 'amount':
                        return Number(a.amount - b.amount);
                    case 'category':
                        if (a.category < b.category) {
                            return -1;
                        }
                        if (a.category > b.category) {
                            return 1;
                        }
                        return 0;
                }
            })
        }
    },
    getters: {
        getRecordsFromState(state) {
            return state.data;
        }
    },
})