<script>
    import TabContainer from './tab-container.vue';

    export default {
        name: 'Tabs',
        props: {
            value: {
                type: [String, Number],
                required: true
            }
        },
        components: {
            TabContainer
        },
        data() {
            return {
                panels: [],
            }
        },
        render() {
            return (
                <div class='tabs'>
                    <ul class='tabs-header'>
                        {this.$slots.default}
                    </ul>
                    <tab-container panels={this.panels}></tab-container>
                </div>
            )
        },
        methods: {
            onChange(index) {
                this.$emit('change', index);
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .tabs-header {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
        border-bottom: 2px solid #ededed;
    }
</style>
