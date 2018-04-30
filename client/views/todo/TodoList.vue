<template>
  <section class="real-app">
        <input 
            type="text" 
            class="new-todo" 
            autofocus="autofocus" 
            placeholder="What needs to be done?"
            @keyup.enter="newTodo"
        >
		<TodoItem
			:todo="todo"
			v-for="todo in filterTodos"
			:key="todo.id"
			@del="deleteTodo"
		/>
		<Tabs 
			:filter="filter" 
			:todos="todos"
			@toggle="toggleFilter"
			@clearCompleted="clearCompleted"
		/>
  </section>
</template>

<script>
	import TodoItem from "./TodoItem.vue";
	import Tabs from "./Tabs.vue";

	let id = 0;
	export default {
		components: {
			TodoItem,
			Tabs
		},
		data() {
			return {
				todos: [],
				filter: "All"
			}
		},
		computed: {
			filterTodos() {
				if (this.filter === 'All') {
					return this.todos;
				}
				const completed = this.filter === 'Completed';
				return this.todos.filter(todo => todo.completed === completed);
			}
		},
		methods: {
			newTodo(e) {
				this.todos.unshift({
					id: id++,
					content: e.target.value.trim(),
					completed: false
				});
				e.target.value = '';
			},
			deleteTodo(id) {
				this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1);
			},
			toggleFilter(state) {
				this.filter = state;
			},
			clearCompleted() {
				this.todos = this.todos.filter(todo => !todo.completed);
			}
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
</style>
