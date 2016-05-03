import { Observable } from 'rx';

const todos = ['Study'];

const todosModel = ({addTodo$, props$}) => {
  return Observable.of(todos)
    .merge(addTodo$)
    .scan((list, item) => [ ...list, item]);
}

export default todosModel;
