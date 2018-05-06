import TodoList from '../views/todo/TodoList.vue'
import Login from '../views/login/Login.vue'

export default [
    {
        path: '/',
        redirect: '/app'
    },
    {
        path: '/app',
        components: {
            default: () => import(/* webpackChunkName: "todo-view" */ '../views/todo/TodoList.vue')
        },
        name: 'app'
    },
    {
        path: '/login',
        components: {
            default: () => import(/* webpackChunkName: "login-view" */ '../views/login/Login.vue')
        },
        name: 'login'
    }
]