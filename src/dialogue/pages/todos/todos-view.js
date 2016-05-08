import { div, ul, li, input, span, button } from '@cycle/dom';

const view = (state$) => {
  return state$.map(todos =>
    div([
      input('.todo-input', {
        type: 'text',
        placeholder: 'Todo',
        value: ''
      }),
      ul(todos.items.map(todo =>
        li('.list-item',[
          todo.editing ? input('.todo-edit', {type: 'text', value: todo.text, autofocus: true, attributes: { 'data-id': todo.id }}) : '',
          !todo.editing ? span(`.todo ${todo.completed ? '.completed' : ''}`, { attributes: { 'data-id': todo.id }}, todo.text) : '',
          button('.remove-todo', {type: 'button', value: todo.id}, 'remove'),
          todo.completed ? button('.unmark-todo', {type: 'button', value: todo.id}, 'unmark') : '',
          !todo.completed ? button('.mark-todo', {type: 'button', value: todo.id}, 'mark as done') : ''
        ])
      )),
      div('.archive-actions', [
        button('.archive', {type: 'button'}, 'Archive completed'),
        span('.archive-info', `${todos.archive.length} archived todos`)
      ])
    ])
  );
};

export default view;
