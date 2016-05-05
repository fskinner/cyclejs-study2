import intent from './tvviter-intent';
import model from './tvviter-model';
import view from './tvviter-view';

export default (sources) => {
  const props$ = sources.Props;
  const actions = intent(sources);
  const state$ = model({...actions, props$});

  return {
    DOM: view(state$),
    // Props: state$
  };
}
