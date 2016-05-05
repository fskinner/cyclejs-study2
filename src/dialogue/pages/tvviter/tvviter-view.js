import { div, p, input, button } from '@cycle/dom';

const view = (state$) => {
  return state$.map(data =>
    div([
      input('.input', { placeholder: 'Your message...', value: '' }),
      button('.btn', 'Erase'),
      div([
        data ? data.map(msg => p('.msg', msg)) : ''
      ])
    ])
  );
};

export default view;
