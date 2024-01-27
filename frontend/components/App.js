import React, {useReducer} from 'react'
import Todos from './Todos'
import TodoForm from './TodoForm'

let id = 1
const getNextId = () => id++

const TOGGLE_SHOW_COMPLETED_TODOS = 'TOGGLE_SHOW_COMPLETED_TODOS'
const TOGGLE_TODOS = 'TOGGLE_TODOS'
const ADD_NEW_TODOS = 'ADD_NEW_TODOS'

const reducer = (state, action) => {
  switch(action.type) {
    case TOGGLE_SHOW_COMPLETED_TODOS:
      return {...state, showCompletedTodos: !state.showCompletedTodos}
    case TOGGLE_TODOS:
      return {...state, 
        todos: state.todos.map((td => {
          if (td.id !== action.payload) return td
            return {...td, complete: !td.complete}
          })
        )}
    case ADD_NEW_TODOS:
      return {...state, todos: [...state.todos, action.payload]}
    default: 
      return state;
  }
};

const intialState = {
  showCompletedTodos: true,
  todos: [
    { id: getNextId(), label: 'Laundry', complete: true },
    { id: getNextId(), label: 'Groceries', complete: false },
    { id: getNextId(), label: 'Dishes', complete: false },
  ]
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, intialState);
  
  const createNewToDo = (label, complete) => {
    //dispatch
    const newTodo = {id: getNextId(), label, complete}
    dispatch({type: ADD_NEW_TODOS, payload: newTodo })
  }

  const toggleTodo = id => {
    dispatch({type: TOGGLE_TODOS, payload: id})
  }
  
  const toggleShowCompletedTodos = () => {
    dispatch({type: TOGGLE_SHOW_COMPLETED_TODOS})
  }

  return (
    <div id="mp">
      <h2>Guided Project</h2>
      <Todos
        todos={state.todos}
        toggleTodo={toggleTodo}
        showCompletedTodos={state.showCompletedTodos}
        toggleShowCompletedTodos={toggleShowCompletedTodos}
      />
      <TodoForm createNewToDo={createNewToDo}
      />
    </div>
  )
}
