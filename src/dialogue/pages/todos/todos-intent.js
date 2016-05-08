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

  archiveComplete$: s.DOM.select('.archive').events('click')
});

export default todosIntent;
