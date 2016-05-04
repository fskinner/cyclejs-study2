const todosIntent = (s) => ({
  addTodo$: s.DOM.select('.todo-input').events('keyup')
    .filter(e => e.keyCode === 13)
    .map(e => e.target.value)
    .filter(msg => msg.trim().length)
    .distinctUntilChanged()
    .map((todo, index) => ({id: (index+1).toString(), text: todo, action: 'add'})),

  removeTodo$: s.DOM.select('.remove-todo').events('click')
    .map(e => ({id: e.target.value.toString(), action: 'remove'}))
});

export default todosIntent;
