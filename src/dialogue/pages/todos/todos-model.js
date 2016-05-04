import { Observable } from 'rx';

const todos = [{id: "0", text: 'Study'}];

function idIncrement(array) {
  return (array[array.length - 1].id + 1).toString();
}

const todosModel = ({addTodo$, removeTodo$, props$}) => {
  return Observable.of(todos)
    .merge(addTodo$)
    .merge(removeTodo$)
    .scan((list, todo) => {
      if(todo.action === 'addTodo') {
        return [ ...list, { id: idIncrement(list), text: todo.text }]
      } else if (todo.action === 'removeTodo') {
        return list.filter(x => x.id !== todo.id)
      }
    })
};

export default todosModel;
