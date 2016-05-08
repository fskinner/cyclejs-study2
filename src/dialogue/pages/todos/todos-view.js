import { div, ul, li, input, span, button } from '@cycle/dom';

function todoItem(todo) {
  return li('.list-item',[
    todo.editing ? input('.todo-edit', {type: 'text', value: todo.text, autofocus: true, attributes: { 'data-id': todo.id }}) : '',
    !todo.editing ? span(`.todo ${todo.completed ? '.completed' : ''}`, { attributes: { 'data-id': todo.id }}, todo.text) : '',
    button('.remove-todo', {type: 'button', value: todo.id}, 'remove'),
    todo.completed ? button('.unmark-todo', {type: 'button', value: todo.id}, 'unmark') : '',
    !todo.completed ? button('.mark-todo', {type: 'button', value: todo.id}, 'mark as done') : ''
  ]);
}

function footer(todos) {
  return div('.archive-actions', [
    button('.archive', {type: 'button'}, 'Archive completed'),
    span('.archive-info', `${todos.archive.length} archived todos`)
  ]);
}

const view = (state$) => {
  return state$.map(todos =>
    div([
      input('.todo-input', {type: 'text', placeholder: 'Todo', value: ''}),
      ul(todos.items.map(todo => todoItem(todo))),
      footer(todos)
    ])
  );
};

export default view;
