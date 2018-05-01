import Notification from './notification.vue';

export default {
    extends: Notification,
    computed: {
        style() {
            return {
                position: 'fixed',
                right: '20px',
                bottom: `${this.offsetY}px`
            };
        }
    },
    mounted() {
        this.createTimer();
    },
    beforeDestroy() {
        this.clearTimer();
    },
    methods: {
        createTimer() {
            if (this.autoClose) {
                this.timer = setTimeout(() => {
                    this.visible = false;
                }, this.autoClose);
            }
        },
        clearTimer() {
            if (this.timer) {
                clearTimeout(this.timer);
            }
        },
        afterEnter() {
            this.height = this.$el.offsetHeight;
        }
    },
    data() {
        return {
            offsetY: 0,
            autoClose: 3000,
            height: 0,
            visible: false
        }
    }
}