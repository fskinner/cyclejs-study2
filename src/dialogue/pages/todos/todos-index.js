import intent from './todos-intent'
import model from './todos-model'
import view from './todos-view'

export default (sources) => {
  const props$ = sources.Props;
  const actions = intent(sources);
  const state$ = model({...actions, props$});

  return {
    DOM: view(state$),
    Props: state$
  };
}
