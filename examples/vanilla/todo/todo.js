// State of the app
const todos = ['Finish Golang', 'Debug Mtandao', 'Deploy Chui']

// HTML element references
const addTodoInput = document.getElementById('todo-input')
const addTodoButton = document.getElementById('add-todo-btn')
const todosList = document.getElementById('todos-list')

// Initialize the view
for (const todo of todos) {
  todosList.append(renderTodoInReadMode(todo))
}

addTodoInput.addEventListener('input', () => {
  addTodoButton.disabled = addTodoInput.value.length < 3
})

addTodoInput.addEventListener('keydown', ({ key }) => {
  if (key === 'Enter' && addTodoInput.value.length >= 3) {
    addTodo()
  }
})

addTodoButton.addEventListener('click', () => {
  addTodo()
})

// Functions
// renderTodoInReadMode(todo) takes a todo description and returns a created list item element
function renderTodoInReadMode(todo) {
  const li = document.createElement('li')

  const span = document.createElement('span')
  span.textContent = todo
  span.addEventListener('dblclick', () => {
    const idx = todos.indexOf(todo)

    todosList.replaceChild(
      renderTodoInEditMode(todo),
      todosList.childNodes[idx]
    )
  })
  li.append(span)

  const button = document.createElement('button')
  button.textContent = 'Done'
  button.addEventListener('click', () => {
    const idx = todos.indexOf(todo)
    removeTodo(idx)
  })
  
  li.append(button)

  return li
}

function renderTodoInEditMode(todo) {
  const li = document.createElement('li')

  const input = document.createElement('input')
  input.type = 'text'
  input.value = todo
  li.append(input)

  const saveBtn = document.createElement('button')
  saveBtn.textContent = 'Save'
  saveBtn.addEventListener('click', () => {
    const idx = todos.indexOf(todo)
    updateTodo(idx, input.value)
  })
  li.append(saveBtn)

  const cancelBtn = document.createElement('button')
  cancelBtn.textContent = 'Cancel'
  cancelBtn.addEventListener('click', () => {
    const idx = todos.indexOf(todo)
    todosList.replaceChild(
      renderTodoInReadMode(todo),
      todosList.childNodes[idx]
    )
  })
  li.append(cancelBtn)

  return li
}

function todoExists(description) {
  const cleanTodos = todos.map((todo) => todo.trim().toLowerCase())
  return cleanTodos.includes(description.trim().toLowerCase())
}  

function addTodo() {
  const description = addTodoInput.value

  // If the desciption === similar todo in the list, return
  if (todoExists(description)) {
    alert('Todo already exists')
    // Clear the input field
    return addTodoInput.value = ''
  }
  todos.push(description)
  const todo = renderTodoInReadMode(description)
  todosList.append(todo)

  readTodo(`Added ${description} to the list`)

  addTodoInput.value = ''
  addTodoButton.disabled = true
}

function readTodo(description) {
  const message = new SpeechSynthesisUtterance()

  message.text = description
  message.voice = speechSynthesis.getVoices()[0]

  speechSynthesis.speak(message)
}
  

function removeTodo(index) {
  todosList.childNodes[index].classList.toggle('line-through');
  todosList.childNodes[index].childNodes[1].remove();

  // Speak the content of the todo
  readTodo(`Completed ${todos[index]}`)
}

function updateTodo(index, description) {
  todos[index] = description
  const todo = renderTodoInReadMode(description)
  todosList.replaceChild(todo, todosList.childNodes[index])
}