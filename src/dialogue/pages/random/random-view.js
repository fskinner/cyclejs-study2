import { div, button, h1, h4, a } from '@cycle/dom';

const view = (state$) => {
  return state$.map(user =>
    div('.users', [
      button('.get-random', 'Get random user'),
      user === null ? null : div('.user-details', [
        h1('.user-name', user.name),
        h4('.user-email', user.email),
        a('.user-website', {href: user.website}, user.website)
      ])
    ])
  );
};

export default view;
