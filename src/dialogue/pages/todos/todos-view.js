import { div, ul, li, input, span, button } from '@cycle/dom';

function todoBody(todo) {
  if(todo.editing) {
    return input('.todo-edit', {type: 'text', value: todo.text, autofocus: true, attributes: { 'data-id': todo.id }});
  }
  return span(`.todo ${todo.completed ? '.completed' : ''}`, { attributes: { 'data-id': todo.id }}, todo.text);
}

function markTodoButtons(todo) {
  if(todo.completed) {
    return button('.unmark-todo', {key: `mark-${todo.id}`, type: 'button', value: todo.id}, 'unmark');
  }
  return button('.mark-todo', {key: `unmark-${todo.id}`, type: 'button', value: todo.id}, 'mark as done');
}

function todoItem(todo) {
  return li('.list-item',[
    todoBody(todo),
    button('.remove-todo', {type: 'button', value: todo.id}, 'remove'),
    markTodoButtons(todo)
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
