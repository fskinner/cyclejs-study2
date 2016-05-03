import { Observable } from 'rx';
import { div, ul, li, input } from '@cycle/dom';

export default ({ DOM }) => {
  const todos = ['Study'];

  const todo$ = DOM.select('.todo').events('keyup')
    .filter(ev => ev.keyCode === 13)
    .map(ev => ev.target.value)
    .filter(msg => msg.trim().length)
    .distinctUntilChanged();

  const todos$ = Observable.of(todos)
    .merge(todo$)
    .scan((list, item) => [ ...list, item]);

  return {
    DOM: todos$.map(data =>
      div([
        input('.todo', {
          type: 'text',
          placeholder: 'Todo',
          autofocus: true,
          value: ''
        }),
        ul(data.map(item =>
          li('.todo', item)
        )),
      ])
    )
  };
}
