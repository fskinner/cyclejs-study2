import { Observable } from 'rx';

const tvviterIntent = (s) => ({
  addMessage$: s.DOM.select('.input').events('keyup')
    .filter(e => e.keyCode === 13)
    .map(e => e.target.value)
    .filter(msg => msg.length <= 30),

  eraseMessage$: s.DOM.select('.btn').events('click')
    .map(() => true)
})

export default tvviterIntent;
