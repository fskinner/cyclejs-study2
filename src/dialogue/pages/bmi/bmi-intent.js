const bmiIntent = s => ({
  changeWeight$: s.DOM.select('#weight').events('input').map(ev => ev.target.value),
  changeHeight$: s.DOM.select('#height').events('input').map(ev => ev.target.value)
})

export default bmiIntent
