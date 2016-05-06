import { div, ul, li, input, span, button } from '@cycle/dom';

const view = (state$) => {
  return state$.map(todos =>
    div([
      input('.todo-input', {
        type: 'text',
        placeholder: 'Todo',
        autofocus: true,
        value: ''
      }),
      ul(todos.items.map(todo =>
        li('.list-item',[
          span('.todo ', todo.text),
          button('.remove-todo', {type: 'button', value: todo.id}, 'remove')
        ])
      )),
    ])
  );
};

export default view;
