const todosIntent = (s) => ({
  addTodo$: s.DOM.select('.todo').events('keyup')
    .filter(ev => ev.keyCode === 13)
    .map(ev => ev.target.value)
    .filter(msg => msg.trim().length)
    .distinctUntilChanged()
})

export default todosIntent;
