const randomModel = ({getRandomUser$, filterRequests$, props$}) => {
  return filterRequests$
    .mergeAll()
    .map(res => res.body)
    .startWith(null)
};

export default randomModel;
