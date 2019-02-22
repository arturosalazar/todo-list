//todoList object to hold list array and related todo list methods
let todoList = {
  todos: [],
  //add a todo object with text + completed property instead of just text
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  // update so that function changes the todoText property on todo objects
  changeTodo: function(index, newVal) {
    this.todos[index].todoText = newVal;
  },

  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  // create function to toggle completed property on todo objects
  toggleCompleted: function(position) {
    //create a variable to hold a reference to particular todo in question
    //less clutter and easier to read code
    let todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  //if everything is true, make everything false
  //else make everything true
  toggleAll: function() {
    let todos = this.todos;
    let completedTodos = 0;
    for (let todo of todos) {
      if (todo.completed === true) {
        completedTodos++;
      }
    }
    if (completedTodos === todos.length) {
      for (let todo of todos) {
        todo.completed = false;
      }
    } else {
      for (let todo of todos) {
        todo.completed = true;
      }
    }
  }
};

//handlers object to hold all code to respond to events on buttons
let handlers = {
  displayTodos: function() {
    todoList.displayTodos();
  },
  addTodo: function() {
    //get value from input textbox and pass it to addTodo method to run
    let addTodosTextInput = document.getElementById('addTodosTextInput');
    todoList.addTodo(addTodosTextInput.value);
    //clear text box when done with running method
    addTodosTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function() {
    let changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    let changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function() {
    let toggleTodoPositionInput = document.getElementById('toggleTodoPositionInput');
    todoList.toggleCompleted(toggleTodoPositionInput.valueAsNumber);
    toggleTodoPositionInput.value = '';
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }
};

//view object to hold all code related to displaying information to screen
let view = {
  //display same number of li elements as todos in todos array
  displayTodos: function() {
    let todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    for (i = 0; i < todoList.todos.length; i++) {
      let todoLi = document.createElement('li');
      let todo = todoList.todos[i];
      let todoTextWithCompletion = '';

      //add appropriate text to show if the todo has been completed.
      if (todo.completed === true) {
        todoTextWithCompletion = `(X) ${todo.todoText} `;
      } else {
        todoTextWithCompletion = `( ) ${todo.todoText} `;
      }

      todoLi.id = i;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    }
  },
  //create a delete button to add to our program
  createDeleteButton: function() {
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },

  setUpEventListeners: function (){
    let todosUl = document.querySelector('ul');

    todosUl.addEventListener('click', function(event){
      let elementClicked = event.target
      //check if delete button is clicked
      if (elementClicked.className === 'deleteButton'){
        //if so, delete the <li> the button is on using parent's id
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};

view.setUpEventListeners();
