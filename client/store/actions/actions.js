import model from 'model';
import notify from '../../components/notification/function';
import bus from '../../util/bus';

const handleError = (err) => {
    if (err.code === 401) {
        notify({ content: 'Need Login' })
        bus.$emit('auth');
    }
}

export default {
    fetchTodos({ commit }) {
        commit('changeLoadingState', true);
        return model.getAllTodos().then(data => {
            commit('fillTodos', data);
            commit('changeLoadingState', false);
        }).catch(err => {
            handleError(err);
            commit('changeLoadingState', false);
        })
    },
    addTodo({ commit }, todo) {
        commit('changeLoadingState', true);
        model.createTodo(todo).then(data => {
            commit('addTodo', data);
            notify({ 'content': 'new todo!!!' });
            commit('changeLoadingState', false);
        }).catch(err => {
            handleError(err);
            commit('changeLoadingState', false);
        })
    },
    updateTodo({ commit }, { id, todo }) {
        commit('changeLoadingState', true);
        model.updateTodo(id, todo).then(data => {
            commit('updateTodo', { id, todo: data });
            notify({ 'content': 'update todo!!!' })
            commit('changeLoadingState', false);
        }).catch(err => {
            handleError(err);
            commit('changeLoadingState', false);
        })
    },
    deleteTodo({ commit }, id) {
        commit('changeLoadingState', true);
        model.deleteTodo(id).then(data => {
            commit('deleteTodo', id);
            notify({ 'content': 'delete todo!!!' })
            commit('changeLoadingState', false);
        }).catch(err => {
            handleError(err);
            commit('changeLoadingState', false);
        })
    },
    deleteAllCompleted({ commit, state }) {
        commit('changeLoadingState', true);
        const ids = state.todos.filter(t => t.completed).map(t => t.id);
        if (ids.length === 0) {
            notify({ 'content': 'no completed!!!' });
            commit('changeLoadingState', false);
            return;
        }

        model.deleteAllCompleted(ids).then(data => {
            commit('deleteAllCompleted');
            notify({ 'content': 'clear completed!!!' })
            commit('changeLoadingState', false);
        }).catch(err => {
            handleError(err);
            commit('changeLoadingState', false);
        })
    },
    login({ commit }, { username, password }) {
        commit('changeLoadingState', true);
        return new Promise((resolve, reject) => {
            model.login(username, password).then(data => {
                commit('doLogin', data);
                notify({ 'content': 'Login success' });
                resolve();
                commit('changeLoadingState', false);
            }).catch(err => {
                handleError(err);
                reject(err);
                commit('changeLoadingState', false);
            })
        })
    }
}