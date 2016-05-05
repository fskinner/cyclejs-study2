import { Observable } from 'rx';
import view from './page2-view';

const Page2 = (sources) => {
  const props$ = sources.Props.map(props => props.Counter);
  const $view = view(props$);

  return {
    DOM: Observable.just($view),
    Props: props$.map(data => ({ Counter: data })),
  }
};

export default Page2
