import Todos from './api/todos'
import './assets/css/main.css'

async function exec () {
  const todos = new Todos()

  const response = await todos.destroy({
    id: 3
  })
  console.log(response)
}

exec()
