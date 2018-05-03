<script>
    export default {
        props: {
            panels: {
                type: Array,
                required: true
            }
        },
        render() {
            const contents = this.panels.map(panel => {
                return panel.active ? panel.$slots.default : null;
            });
            return (
                <div class="tab-content">
                    {contents}
                </div>
            )
        }
    }
</script>
