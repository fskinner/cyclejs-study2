import { Observable } from 'rx';

function calculateBMI(weight, height) {
  const heightMeters = height * 0.01;
  return Math.round(weight / (heightMeters * heightMeters));
}

const bmiModel = ({changeWeight$, changeHeight$, props$}) => {
  return Observable.combineLatest(
    changeWeight$.startWith(70),
    changeHeight$.startWith(170),
    (weight, height) =>
      ({weight, height, bmi: calculateBMI(weight, height)})
  );
}

export default bmiModel;
