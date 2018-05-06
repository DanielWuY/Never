<template>
	<div id="app">
    	<div id="cover"></div>
		<div id="loading" v-show="loading">
			<loading></loading>
		</div>
		<MainHeader></MainHeader>
		<transition name="fade" mode="out-in">
			<router-view/>
		</transition>
		<MainFooter></MainFooter>
	</div>
</template>

<script>
	import MainHeader from "./layout/MainHeader.vue";
	import MainFooter from "./layout/MainFooter.vue";
	import Loading from './components/loading/loading.vue';
	import { mapState } from 'vuex';

	export default {
		metaInfo: {
			title: 'Never'
		},
		components: {
			MainHeader,
			MainFooter,
			Loading
		},
		computed: {
			...mapState(['loading']),
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

	#loading {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(255, 255, 255, 0.3);
		z-index: 99;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
