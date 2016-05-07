import { Observable } from 'rx';

const initialState = { items: [{ id: "0", text: 'Study', completed: false }]};

const idIncrement = (array) => (array[array.length - 1].id + 1);

const Operations = {
  Add: todoText => state => ({
    items: [ ...state.items,
      {
        id: idIncrement(state.items).toString(),
        text: todoText,
        completed: false
      }
    ]
  }),

  Remove: todoId => state => ({
    items: state.items.filter(x => x.id !== todoId)
  }),

  Complete: todoId => state => ({
    items: state.items.map(x => {
      if(x.id === todoId) {
        x.completed = true;
      }
      return x;
    })
  })
};

const todosModel = ({addTodo$, removeTodo$, completeTodo$}) => {
  const addOp$ = addTodo$.map(item => Operations.Add(item));
  const removeOp$ = removeTodo$.map(item => Operations.Remove(item));
  const completeOp$ = completeTodo$.map(item => Operations.Complete(item));

  const allOperations$ = Observable.merge(addOp$, removeOp$, completeOp$);

  const state$ = allOperations$.startWith(initialState).
      scan((state, operation) => operation(state));

  return state$;
}

export default todosModel;
