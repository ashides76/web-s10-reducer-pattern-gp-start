import React, { useReducer } from 'react'

const CHANGE_LABEL = 'CHANGE_LABEL';
const CHANGE_IS_COMPLETED = 'CHANGE_IS_COMPLETED'

const intialState = {
  todoLable: '',
  todoIsCompleted: false,
}


// {type: CHANGE_LABEL, payload: 'foo'} // action
// was there a reason to use state and action as parms?
const reducer = (state, action) => {
  console.log('state:', state);
  console.log('action', action);
  //Q: where type map (type of action) is coming from? 
  switch (action.type) {
    case CHANGE_LABEL:
      return { ...state, todoLable: action.payload }

    case CHANGE_IS_COMPLETED:
      return{ ...state, todoIsCompleted: action.payload }
    
    default: 
      return state;
  }
}

export default function TodoForm({createNewToDo}) {
  const [state, dispatch] = useReducer(reducer, intialState);

  const onLableChange = env => {
    // debugger
    dispatch({ type: CHANGE_LABEL, payload: env.target.value })
  };

  const onIsCompleted = env => {
    // debugger
    dispatch({ type: CHANGE_IS_COMPLETED, payload: env.target.checked })
  };

  const resetForm = () => {
    dispatch({type: CHANGE_LABEL, payload: ''})
    dispatch({type: CHANGE_IS_COMPLETED, payload: false })
  };

  const onNewToDo = env => {
    env.preventDefault();
    // why use state and not dispatch?
    createNewToDo(state.todoLable, state.todoIsCompleted)
    resetForm();
  }


  return (
    <form id="todoForm" onSubmit={onNewToDo} >
      <h3>New Todo Form</h3>
      <label><span>Todo label:</span>
        <input
          onChange={onLableChange}
          value={state.todoLable}
          type='text'
          name='todoLabel'
          placeholder='Type label'
        />
      </label>
      <label><span>Is completed:</span>
        <input
          onChange={onIsCompleted}
          checked={state.todoIsCompleted}
          type='checkbox'
          name='todoIsCompleted'
        />
      </label>
      <label><span>Create todo:</span>
        <input
          type='submit'
          value='Do it!'
        />
      </label>
    </form>
  )
}
