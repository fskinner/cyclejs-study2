import Rx from 'rx';
import view from './page1-view';

const Page1 = (sources) => {
  const props$ = sources.Props.map(props => props.Counter);
  const $view = view(props$);

  return {
    DOM: Rx.Observable.just($view),
    Props: props$.map(data => ({ Counter: data })),
  }
};

export default Page1
