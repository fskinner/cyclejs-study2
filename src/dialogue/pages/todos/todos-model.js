import { Observable } from 'rx';

const initialState = {
  items: [{ id: "0", text: 'Study', completed: false, editing: false }],
  archive: []
};

const idIncrement = (array) => {
  if(array.length === 0) {
    return 0;
  }

  return array[array.length - 1].id + 1
};

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

  Mark: (todoId, status) => state => ({
    items: state.items.map(x => {
      if(x.id === todoId) {
        x.completed = status;
      }
      return x;
    }),
    archive: state.archive
  }),

  Archive: completeStatus => state => ({
    items: state.items.filter(x => x.completed !== completeStatus),
    archive: state.archive.concat(state.items.filter(x => x.completed === completeStatus))
  }),

  ToggleEdit: (todoId, status) => state => ({
    items: state.items.map(x => {
      if(x.id === todoId) {
        x.editing = status;
      }
      return x;
    }),
    archive: state.archive
  }),

  SaveEdit: ({id, text}) => state => ({
    items: state.items.map(x => {
      if(x.id === id) {
        x.text = text;
        x.editing = false;
      }
      return x;
    }),
    archive: state.archive
  })
};

const todosModel = (actions) => {
  const {
    addTodo$, removeTodo$, markTodo$,
    unmarkTodo$, archiveComplete$,
    toggleEdit$, cancelEdit$, editTodo$
  } = actions;

  const addOp$ = addTodo$.map(todoText => Operations.Add(todoText));
  const removeOp$ = removeTodo$.map(todoId => Operations.Remove(todoId));

  const markOp$ = markTodo$.map(todoId => Operations.Mark(todoId, true));
  const unmarkOp$ = unmarkTodo$.map(todoId => Operations.Mark(todoId, false));

  const archiveCompleteOp$ = archiveComplete$.map( _ => Operations.Archive(true));

  const toggleEditOp$ = toggleEdit$.map(todoId => Operations.ToggleEdit(todoId, true));
  const cancelEditOp$ = cancelEdit$.map(todoId => Operations.ToggleEdit(todoId, false));
  const saveEditOp$ = editTodo$.map(todo => Operations.SaveEdit({...todo}));

  const allOperations$ = Observable.merge(
    addOp$, removeOp$, markOp$, unmarkOp$,
    archiveCompleteOp$, toggleEditOp$, cancelEditOp$,
    saveEditOp$
  );

  const state$ = allOperations$
    .startWith(initialState)
    .scan((state, operation) => operation(state));

  return state$;
}

export default todosModel;
