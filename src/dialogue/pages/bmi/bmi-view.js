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

const view = (state$) => {
  return state$.map(({weight, height, bmi}) =>
    div([
      renderWeightSlider(weight),
      renderHeightSlider(height),
      h2('BMI is ' + bmi)
    ])
  );
}

export default view
