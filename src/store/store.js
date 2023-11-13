import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        data: [],
    },
    actions: {
        setCookie(name, value, options = {}) {
        
            options = {
                path: '/',
                ...options  
            };
        
            let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        
            for (let optionKey in options) {
                updatedCookie += "; " + optionKey;
                let optionValue = options[optionKey];
                if (optionValue !== true) {
                    updatedCookie += "=" + optionValue;
                }
            }
            document.cookie = updatedCookie;
        },

        getCookie(state, arg) {
            console.log(arg)
            console.log('Action getCookie: ' + arg)
            let matches = document.cookie.match(new RegExp(
                "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + "=([^;]*)"
            ));

            return matches ? decodeURIComponent(matches[1]) : undefined;
        },
        
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
        
        processFilters(context, arg) {
            console.log('Action processFilters: '+ arg);
            context.dispatch('getCookie', arg)
                .then(result => function() {
                    if (result) {
                        console.log(result);
                    } else {
                        let filterMap = [];
                        const filterSteps = result.split('/');
                        filterSteps.forEach(element => {
                            const steps = element.split('_')
                            let resultObj = {
                                column: steps[0],
                                order: steps[1]
                            };
                            filterMap.push(resultObj)
                        })
                    }
                })
            
        }
    },
    mutations: {
        writeOldRecords(state, list) {
            state.data = list.data;
        },
        addNewInState(state, record) {
            state.data.push(record)
        },
        makeSort(state, filterMap) {
            state.data.sort(function (a, b) {
                switch (filterMap.column) {
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
        },
    },
})