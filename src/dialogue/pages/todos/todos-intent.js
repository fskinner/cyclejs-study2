
const todosIntent = (s) => ({
  addTodo$: s.DOM.select('.todo-input').events('keyup')
    .filter(e => e.keyCode === 13)
    .map(e => e.target.value)
    .filter(msg => msg.trim().length)
    .distinctUntilChanged(),

  removeTodo$: s.DOM.select('.remove-todo').events('click')
    .map(e => e.target.value),

  markTodo$: s.DOM.select('.mark-todo').events('click')
    .map(e => e.target.value),

  unmarkTodo$: s.DOM.select('.unmark-todo').events('click')
    .map(e => e.target.value),

  archiveComplete$: s.DOM.select('.archive').events('click'),

  toggleEdit$: s.DOM.select('.todo').events('click')
    .buffer(s.DOM.select('.todo').events('click').debounce(250))
    .filter(events => events.length === 2)
    .map(e => e[0].target.getAttribute('data-id')),

  cancelEdit$: s.DOM.select('.todo-edit').events('keyup')
    .filter(e => e.keyCode === 27)
    .map(e => e.target.getAttribute('data-id')),

  editTodo$: s.DOM.select('.todo-edit').events('keyup')
    .filter(e => e.keyCode === 13)
    .filter(e => e.target.value.trim().length)
    .map(e => ({ id: e.target.getAttribute('data-id'), text: e.target.value })),

  clearComplete$: s.DOM.select('.clear').events('click'),

});

export default todosIntent;
