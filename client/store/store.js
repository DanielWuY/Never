import Vuex from 'vuex';
import defaultState from './state/state';
import defaultMutation from './mutations/mutations';
import defaultGetters from './getters/getters';
import defaultAction from './actions/actions';

export default () => {
    const store = new Vuex.Store({
        state: defaultState,
        mutations: defaultMutation,
        getters: defaultGetters,
        actions: defaultAction
    });

    if (module.hot) {
        module.hot.accept([
            './state/state',
            './mutations/mutations',
            './actions/actions',
            './getters/getters'
        ], () => {
            const newState = require('./state/state');
            const newMutations = require('./mutations/mutations');
            const newActions = require('./actions/actions');
            const newGetters = require('./getters/getters');

            hot.update({
                state: newState,
                mutations: newMutations,
                actions: newActions,
                getters: newGetters
            })
        })
    }

    return store;
}
