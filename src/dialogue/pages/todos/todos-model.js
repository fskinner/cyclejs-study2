import { Observable } from 'rx';

const initialState = {
  items: [{ id: "0", text: 'Study', completed: false }],
  archive: []
};

const idIncrement = (array) => (array[array.length - 1].id + 1);

const Operations = {
  Add: todoText => state => ({
    items: [ ...state.items,
      {
        id: idIncrement(state.items).toString(),
        text: todoText,
        completed: false
      }
    ],
    archive: state.archive
  }),

  Remove: todoId => state => ({
    items: state.items.filter(x => x.id !== todoId),
    archive: state.archive
  }),

  Complete: todoId => state => ({
    items: state.items.map(x => {
      if(x.id === todoId) {
        x.completed = true;
      }
      return x;
    }),
    archive: state.archive
  }),

  Archive: completeStatus => state => ({
    items: state.items.filter(x => x.completed !== completeStatus),
    archive: state.archive.concat(state.items.filter(x => x.completed === completeStatus))
  })
};

const todosModel = ({addTodo$, removeTodo$, completeTodo$, archiveComplete$}) => {
  const addOp$ = addTodo$.map(todo => Operations.Add(todo));
  const removeOp$ = removeTodo$.map(todoId => Operations.Remove(todoId));
  const completeOp$ = completeTodo$.map(todoId => Operations.Complete(todoId));
  const archiveCompleteOp$ = archiveComplete$.map( _ => Operations.Archive(true));

  const allOperations$ = Observable.merge(
    addOp$, removeOp$, completeOp$, archiveCompleteOp$
  );

  const state$ = allOperations$.startWith(initialState).
      scan((state, operation) => operation(state));

  return state$;
}

export default todosModel;
