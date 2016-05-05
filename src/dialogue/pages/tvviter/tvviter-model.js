import { Observable } from 'rx';

const tvviterModel = ({addMessage$, eraseMessage$, props$}) => {
  return Observable.of([])
    .merge(addMessage$)
    .merge(eraseMessage$)
    .scan((x,y) => {
      if(y === true) {
        return x;
      }

      return [ ...x, y];
    })
};

export default tvviterModel;
