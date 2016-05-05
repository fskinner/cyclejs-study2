import { h, div, ul, li, a, nav, h1, h2 } from '@cycle/dom'

const view = () => {
  return div([
    h1('.brand-title', ['APP for']),
    h2('.brand-tagline', ['Experimenting with Cycle.js']),
    nav('.nav', [
      ul('.nav-list', [
        li('.nav-item .link', [
          a('.pure-button', {href: '/'}, ['Home'])
        ]),
        li('.nav-item .link', [
          a('.pure-button', {href: '/page1'}, ['Page 1'])
        ]),
        li('.nav-item .link .testlink', [
          a('.pure-button', {href: '/page2'}, ['Page 2'])
        ]),
        li('.nav-item .link', [
          a('.pure-button', {href: '/todos'}, ['Todos'])
        ]),
        li('.nav-item .link', [
          a('.pure-button', {href: '/random'}, ['Rand'])
        ]),
        li('.nav-item .link', [
          a('.pure-button', {href: '/bmi'}, ['BMI'])
        ]),
        li('.nav-item .link', [
          a('.pure-button', {href: '/tvviter'}, ['Tvviter'])
        ])
      ])
    ])])
};

export default view;
