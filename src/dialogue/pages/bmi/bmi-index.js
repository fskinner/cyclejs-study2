import intent from './bmi-intent'
import model from './bmi-model'
import view from './bmi-view'

export default (sources) => {
  const props$ = sources.Props;
  const actions = intent(sources);
  const state$ = model({...actions, props$});

  return {
    DOM: view(state$),
    Props: state$
  };
}
