import { extractValue } from '../../utils';
import intent from './navbar-intent';
import model from './navbar-model';
import view from './navbar-view';

const navbar = (sources) => {
  const actions = intent(sources);
  const state$ = model({actions});
  const view$ = view(sources);

  return {
    DOM: view$,
    url$: extractValue(`url`, state$),
  }
};

export default navbar;
