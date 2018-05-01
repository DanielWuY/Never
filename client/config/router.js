import Router from 'vue-router'
import routes from './routes'

export default () => {
    return new Router({
        routes,
        mode: 'history',
        scrollBehavior(to, from, savedPosition) {
            return savedPosition || { x: 0, y: 0 };
        }
    })
}