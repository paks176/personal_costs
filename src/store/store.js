import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        data: [],
        defaultArray: [],
        cookieFilterMap: {},
        errorsStack: [
            {
                type: 'warning',
                header: 'Не удалось определить вашу роль',
                text: 'Мы не смогли определить вашу роль в Справке, вы можете дальше пользоваться справкой. Для более корректного отображения информации, рекомендуем войти заново.',
            },
        ],
    },
    actions: {
        async setCookie(state, filterMap) {
            function mapCookie(filterMap) {
                let resultString = '';
                resultString += filterMap.column ? ('column_' + filterMap.column + '/') : 'column_none/';
                resultString += filterMap.order ? ('order_' + filterMap.order) : 'order_increase';
                resultString += ';'
                return resultString;
            }
            document.cookie = 'personalCostsFilters' + '=' + mapCookie(filterMap);
        },

        async getCookie() {
            let matches = document.cookie.match('personalCostsFilters');
            return matches ? decodeURIComponent(matches.input) : undefined;
        },
        
        async getRecordsList(context) {
            fetch('https://run.mocky.io/v3/95abb8d5-3ee5-49df-9c49-07d91a6852b2')
                .then(data => {
                    data.json()
                        .then(result => {
                            context.commit('writeDefault', result)
                            context.commit('writeOldRecords', result)
                        })
                        .then(function() {
                            context.dispatch('processFilters')
                        })
                })
        },
        
        processFilters(context) {
            context.dispatch('getCookie')
                .then(result => {
                    if (result) {
                        // apply filters
                        const filterSteps = result.split('=')[1].split('/');
                        let resultFilterMap = {
                            column: filterSteps[0].split('_')[1],
                            order: filterSteps[1].split('_')[1],
                        }
                   
                        context.commit('makeSort', resultFilterMap);
                        context.commit('changeFilterMap', resultFilterMap)
                    } else {
                        // default filters
                        context.dispatch('setCookie', {column: 'none', order: 'increase'})
                            .then(function() {
                                console.warn('The Project cookie is set to default');
                            }
                        )
                    }
                })
        }
    },
    mutations: {
        writeDefault(state, list) {
            state.defaultArray = [...list.data];
        },
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
                        switch (filterMap.order) {
                            case 'increase':
                                return Number(a.amount - b.amount); 
                            case 'decrease':
                                return Number(b.amount - a.amount);
                        }
                        break;
                    case 'category':
                        switch (filterMap.order) {
                            case 'increase':
                                if (a.category < b.category) {
                                    return -1;
                                }
                                if (a.category > b.category) {
                                    return 1;
                                }
                                return 0;
                            case 'decrease' :
                                if (a.category < b.category) {
                                    return 1;
                                }
                                if (a.category > b.category) {
                                    return -1;
                                }
                                return 0;
                                
                        }
                        break;
                    case 'date':
                        switch (filterMap.order) {
                            case 'increase':
                                {
                                    const aDate = Date.parse(a.date);
                                    const bDate = Date.parse(b.date);
                                    if (aDate < bDate) {
                                        return -1;
                                    }
                                    if (aDate > bDate) {
                                        return 1;
                                    }
                                    return 0;  
                                }
                            case 'decrease':
                                 {
                                    const aDate = Date.parse(a.date);
                                    const bDate = Date.parse(b.date);
                                    if (aDate < bDate) {
                                        return 1;
                                    }
                                    if (aDate > bDate) {
                                        return -1;
                                    }
                                    return 0;
                                }

                        }
                }
            });
            
            this.dispatch('setCookie', filterMap);
            
        },
        
        resetSorting(state) {
            state.data = [...state.defaultArray];
            this.dispatch('setCookie', {column: 'none', order: 'increase'})
                .then(function() {
                        console.warn('The Project cookie is set to default');
                    }
                )
        },
        
        changeFilterMap(state, map) {
            state.cookieFilterMap = map 
        }
    },
    getters: {
        getRecordsFromState(state) {
            return state.data;
        },
        getDefaultList(state) {
            return state.defaultArray;
        },
        getCookieFilterMap(state) {
            return state.cookieFilterMap;
        },
        getErrorsStack(state) {
          return state.errorsStack;  
        },
    },
})