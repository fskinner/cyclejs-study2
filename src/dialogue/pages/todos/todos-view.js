import { div, ul, li, input } from '@cycle/dom';

const view = (state$) => {
  return state$.map(data =>
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
  );
}

export default view
