import { Observable } from 'rx';

const initialState = { items: [{id: "0", text: 'Study'}]};

const idIncrement = (array) => (array[array.length - 1].id + 1);

const Operations = {
  Add: todoText => state => ({
    items: [
      ...state.items,
      { id: idIncrement(state.items).toString(), text: todoText }
    ]
  }),

  Remove: todoId => state => ({
    items: state.items.filter(x => x.id !== todoId)
  })
};

const todosModel = ({addTodo$, removeTodo$, props$}) => {
  const addOperation$ = addTodo$.map(item => Operations.Add(item));
  const removeOperation$ = removeTodo$.map(item => Operations.Remove(item));

  const allOperations$ = Observable.merge(addOperation$, removeOperation$);

  const state$ = allOperations$.startWith(initialState).
      scan((state, operation) => operation(state));

  return state$;
}

export default todosModel;
