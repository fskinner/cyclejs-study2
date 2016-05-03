const USERS_URL = 'http://jsonplaceholder.typicode.com/users/';

const randomIntent = (s) => ({
  getRandomUser$: s.DOM.select('.get-random').events('click')
    .map(() => {
      const randomNum = Math.round(Math.random()*9)+1;
      return {
        url: USERS_URL + String(randomNum),
        method: 'GET'
      };
    }),

  filterRequests$: s.HTTP
    .filter(res$ => res$.request.url.indexOf(USERS_URL) === 0)
});

export default randomIntent;
