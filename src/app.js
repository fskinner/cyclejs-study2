import { run } from '@cycle/core';
import { makeDOMDriver } from '@cycle/dom';
import { makeHTTPDriver } from '@cycle/http';
import { makeHistoryDriver } from '@cycle/history';
import { useQueries, createHistory } from 'history';
import Rx from 'rx';
import Main from './main'
import { rerunner, restartable } from 'cycle-restart';

// we are pulling in our css files here for webpack to compile
import 'styles/pure-min.css';
import 'styles/layout.css';
import 'styles/grids-responsive-min.css';

// this is the Cycle run. first argument is our mainApp then an object:
// DOM is the ID or class we want the cycle to render onto our page
// History is using our makeHistoryDriver to deal with routing
const history = useQueries(createHistory)();
const drivers = {
  DOM: makeDOMDriver('#app'),
  HTTP: makeHTTPDriver(),
  History: makeHistoryDriver(history),
  Props: () => Rx.Observable.just({ Counter: 0})
};

const rerun = rerunner(run);
rerun(Main, drivers);

if (module && module.hot) {
  module.hot.accept('./main', () => {
    const main = require('./main').default;
    rerun(main, drivers);
  });
  module.hot.accept();
}
