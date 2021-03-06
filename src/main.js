import { createApp } from 'vue'
import Todos from './api/todos'
import './assets/css/main.css'

const apiTodos = new Todos()

/*
<li class="todo">
  <label class="checkbox-input">
    <input type="checkbox" checked="true" />
    <span class="checkmark"></span>
  </label>
  <span class="todo-text"></span>
  <a class="todo-delete"></a>
</li>

*/

// async function exec () {
//   const todos = await apiTodos.index()

//   const ul = document.querySelector('ul.todos')

//   todos.forEach(todo => {
//     // todo/li
//     const li = document.createElement('li')
//     li.setAttribute('class', 'todo')

//     //todo checkbox
//     const todoCheckbox = document.createElement('label')
//     todoCheckbox.setAttribute('class', 'checkbox-input')

//     //todo checkbox -> input
//     const inputCheckbox = document.createElement('input')
//     inputCheckbox.setAttribute('type', 'checkbox')
//     if (todo.done) {
//       inputCheckbox.setAttribute('checked', 'checked')
//     }

//     //todo checkbox -> span
//     const spanCheckbox = document.createElement('span')
//     spanCheckbox.setAttribute('class', 'checkmark')

//     todoCheckbox.appendChild(inputCheckbox)
//     todoCheckbox.appendChild(spanCheckbox)

//     // todo text
//     const todoText = document.createElement('span')
//     todoText.setAttribute('class', 'todo-text')

//     const spanText = document.createTextNode(todo.text)
//     todoText.appendChild(spanText)

//     // todo delete
//     const todoDelete = document.createElement('span')
//     todoDelete.setAttribute('class', 'todo-delete')

//     li.appendChild(todoCheckbox)
//     li.appendChild(todoText)
//     li.appendChild(todoDelete)

//     ul.appendChild(li)
//   })
// }

// exec()

const app = createApp({
  data () {
    return {
      todo: {
        text: '',
        done: false
      },
      todos: []
    }
  },
  created () {
    this.fetchTodos()
  },
  methods: {
    async fetchTodos () {
      this.todos = await apiTodos.index()
    },
    async createTodo () {
      const data = await apiTodos.create(this.todo)
      this.todos.push(data)

      this.todo.text = ''
      this.todo.done = false
    },
    async toggleTodoStatus (todo) {
      const data = await apiTodos.update({
        ...todo,
        done: !todo.done
      })

      const index = this.todos.findIndex(({ id }) => id === data.id)
      this.todos[index] = data
    },
    async deleteTodo (id) {
      console.log(id)
      await apiTodos.destroy({ id })

      const index = this.todos.findIndex(todo => todo.id === id)

      this.todos.splice(index, 1)
    }
  }
})

app.mount('#app')
