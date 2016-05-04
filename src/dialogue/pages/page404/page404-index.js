import { Observable } from 'rx';
import view from './page404-view';

const Page404 = () => {
  const view$ = Observable.just(view());
  return {
    DOM: view$
  }
};

export default Page404
