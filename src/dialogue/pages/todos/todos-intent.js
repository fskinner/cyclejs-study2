const todosIntent = (s) => ({
  addTodo$: s.DOM.select('.todo-input').events('keyup')
    .filter(e => e.keyCode === 13)
    .map(e => e.target.value)
    .filter(msg => msg.trim().length)
    .distinctUntilChanged()
    .map((todo, index) => ({ action: 'addTodo', text: todo })),

  removeTodo$: s.DOM.select('.remove-todo').events('click')
    .map(e => ({ action: 'removeTodo', id: e.target.value }))
});

export default todosIntent;
