<template>
	<div id="app">
    	<div id="cover"></div>
		<MainHeader></MainHeader>
		<transition name="fade">
			<router-view/>
		</transition>
		<MainFooter></MainFooter>
	</div>
</template>

<script>
	import MainHeader from "./layout/MainHeader.vue";
	import MainFooter from "./layout/MainFooter.vue";

	export default {
		metaInfo: {
			title: 'Never'
		},
		components: {
			MainHeader,
			MainFooter
		}
	};
</script>

<style lang="stylus" scoped>
	#app {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
	}

	#cover {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background-color: #eee;
		opacity: 0.5;
		z-index: -1;
	}
</style>
