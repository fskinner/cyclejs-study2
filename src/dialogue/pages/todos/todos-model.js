import { Observable } from 'rx';
import Operations from './todo-operations';

const initialState = {
  items: [{ id: "0", text: 'Study', completed: false, editing: false }],
  archive: []
};

const todosModel = (actions) => {
  const addOp$ = actions.addTodo$.map(todoText => Operations.Add(todoText));
  const removeOp$ = actions.removeTodo$.map(todoId => Operations.Remove(todoId));

  const markOp$ = actions.markTodo$.map(todoId => Operations.Mark(todoId, true));
  const unmarkOp$ = actions.unmarkTodo$.map(todoId => Operations.Mark(todoId, false));

  const archiveCompleteOp$ = actions.archiveComplete$.map( _ => Operations.Archive(true));

  const toggleEditOp$ = actions.toggleEdit$.map(todoId => Operations.ToggleEdit(todoId, true));
  const cancelEditOp$ = actions.cancelEdit$.map(todoId => Operations.ToggleEdit(todoId, false));
  const saveEditOp$ = actions.editTodo$.map(todo => Operations.SaveEdit({...todo}));

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
