import intent from './random-intent';
import model from './random-model';
import view from './random-view';

export default (sources) => {
  const props$ = sources.Props;
  const actions = intent(sources);
  const state$ = model({...actions, props$});

  return {
    DOM: view(state$),
    HTTP: actions.getRandomUser$,
    // Props: state$
  };
}
