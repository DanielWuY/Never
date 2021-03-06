<template>
  <section class="real-app">
	  	<div class="tab-container">
			<tabs :value="filter" @change="handleChangeTab">
				<tab :label="state" :index="state" v-for="state in states" :key="state"></tab>
			</tabs>
		</div>
        <input 
            type="text" 
            class="new-todo" 
            autofocus="autofocus" 
            placeholder="What needs to be done?"
            @keyup.enter="handleAdd"
        >
		<TodoItem
			:todo="todo"
			v-for="todo in filterTodos"
			:key="todo.id"
			@del="deleteTodo"
			@toggle="toggleTodoState"
		/>
		<TodoHelper 
			:filter="filter" 
			:todos="todos"
			@clearCompleted="deleteAllCompleted"
		/>
  </section>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import TodoItem from "./TodoItem.vue";
	import TodoHelper from "./TodoHelper.vue";

	export default {
		components: {
			TodoItem,
			TodoHelper
		},
		data() {
			return {
				filter: "All",
				states: ['All', 'Active', 'Completed']
			}
		},
		computed: {
			...mapState(['todos']),
			filterTodos() {
				if (this.filter === 'All') {
					return this.todos;
				}
				const completed = this.filter === 'Completed';
				return this.todos.filter(todo => todo.completed === completed);
			}
		},
		methods: {
			...mapActions(['fetchTodos', 'addTodo', 'deleteTodo', 'updateTodo', 'deleteAllCompleted']),
			handleAdd(e) {
				const content = e.target.value.trim();
				if (!content) {
					this.$notify({ content: 'no todo content!' });
					return;
				}
				const todo = { content, completed: false };
				this.addTodo(todo);
				e.target.value = '';
			},
			handleChangeTab(value) {
				this.filter = value;
			},
			toggleTodoState(todo) {
				this.updateTodo({
					id: todo.id,
					todo: Object.assign({}, todo, {
						completed: !todo.completed
					})
				})
			}
		},
		mounted() {
			if (this.todos && this.todos.length < 1) {
				this.fetchTodos();
			}
		},
		asyncData({ store, router }) {
			if (store.state.user) {
				return store.dispatch('fetchTodos');
			}
			return Promise.resolve();
		}
	};
</script>

<style lang="stylus" scoped>
	.real-app {
		width: 600px;
		margin: 0 auto;
		box-shadow: 0 0 5px #666;
	}

	.new-todo {
		position: relative;
		margin: 0;
		width: 100%;
		font-size: 24px;
		font-family: inherit;
		font-weight: inherit;
		line-height: 1.4em;
		border: 0;
		outline: none;
		color: inherit;
		box-sizing: border-box;
		font-smoothing: antialiased;
		padding: 16px 16px 16px 36px;
		border: none;
		box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
	}

	.tab-container {
		background-color: #fff;
		padding: 0 15px;
	}
</style>
