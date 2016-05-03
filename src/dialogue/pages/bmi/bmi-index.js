import { Observable } from 'rx';
import { div, input, h2, makeDOMDriver } from '@cycle/dom';

function renderWeightSlider(weight) {
  return div([
    'Weight ' + weight + 'kg',
    input('#weight', {type: 'range', min: 40, max: 140, value: weight})
  ]);
}

function renderHeightSlider(height) {
  return div([
    'Height ' + height + 'cm',
    input('#height', {type: 'range', min: 140, max: 210, value: height})
  ]);
}

function intent(DOM) {
  return {
    changeWeight$: DOM.select('#weight').events('input')
      .map(ev => ev.target.value),

    changeHeight$: DOM.select('#height').events('input')
      .map(ev => ev.target.value)
  };
}

function model(actions) {
  return Rx.Observable.combineLatest(
    actions.changeWeight$.startWith(70),
    actions.changeHeight$.startWith(170),
    (weight, height) =>
      ({weight, height, bmi: calculateBMI(weight, height)})
  );
}

function view(state$) {
  return state$.map(({weight, height, bmi}) =>
    div([
      renderWeightSlider(weight),
      renderHeightSlider(height),
      h2('BMI is ' + bmi)
    ])
  );
}

function calculateBMI(weight, height) {
  const heightMeters = height * 0.01;
  return Math.round(weight / (heightMeters * heightMeters));
}

export default ({DOM}) => {
  const actions = intent(DOM);
  const state$ = model(actions);

  return {
    DOM: view(state$)
  };
}
