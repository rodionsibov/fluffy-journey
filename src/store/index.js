import { createStore } from 'vuex'

export default createStore({
  state: {
    todos: []
  },
  getters: {
    allTodos: (state) => state.todos
  },
  mutations: {
    setTodos: (state, todos) => (state.todos = todos),
    newTodo: (state, todo) => state.todos.unshift(todo),
    removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id),
    updateTodo: (state, updateTodo) => {
      const index = state.todos.findIndex(todo => todo.id === updateTodo.id)
      if (index !== -1) {
        state.todos.splice(index, 1, updateTodo)
      }
    }
  },
  actions: {
    async fetchTodos({ commit }) {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos')
      const data = await res.json()
      console.log(data);
      commit('setTodos', data)
    },
    async addTodo({ commit }, title) {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title, completed: false
        })
      })
      const data = await res.json()
      console.log(data);
      commit('newTodo', data)
    },
    async deleteTodo({ commit }, id) {
      await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',
      })
      commit('removeTodo', id)
    },
    async filterTodos({ commit }, e) {
      // Get selected number
      const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText)
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`)
      const data = await res.json()
      console.log(data);
      commit('setTodos', data)
    },
    async updateTodo({ commit }, updateTodo) {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${updateTodo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateTodo)
      })
      const data = await res.json()
      console.log(data);
      commit('updateTodo', data)
    }
  },
  modules: {
  }
})
