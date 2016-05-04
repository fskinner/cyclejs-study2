import { Observable } from 'rx';

const todos = [{id: '0', text: 'Study'}];

const todosModel = ({addTodo$, removeTodo$, props$}) => {
  return Observable.of(todos)
    .merge(addTodo$)
    .merge(removeTodo$)
    .scan((list, todo) => {
      if(todo.action === 'add') {
        return [ ...list, {id: todo.id, text: todo.text}]
      } else if (todo.action === 'remove') {
        return list.filter(x => x.id !== todo.id)
      }
    })
};

export default todosModel;
