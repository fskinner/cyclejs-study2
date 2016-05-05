import Rx from 'rx';
import view from './home-view';
import intent from './home-intent';
import model from './home-model';

// returning our DOM
const Home = (sources) => {
  const props$ = sources.Props.map(props => props.Counter);
  const actions = intent(sources);
  const state$ = model({...actions,props$});

  return {
    DOM: view(state$),
    Props: state$.map(data => ({ Counter: data })),
  }
};

export default Home
