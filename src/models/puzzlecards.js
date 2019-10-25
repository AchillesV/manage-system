//import request from '../util/request';  // request 是 demo 项目脚手架中提供的一个做 http 请求的方法，是对于 fetch 的封装，返回 Promise

const request = (url, options) => {
  console.log("url", url)
  return fetch(url, options)
  .then(response => {
    
  return response.json();
  })
  .catch(err => ({ err }));
}

const delay = (millisecond) => {
  return new Promise((resolve) => {
    setTimeout(resolve, millisecond);
  });
};

export default {
  namespace: 'puzzlecards',
  state: {
    data: [
      {
        id: 1,
        title: 'hello world1',
        body: 'c++'
      },
      {
        id: 2,
        title: 'hello react1',
        body: 'javascript'
      }
    ],
    counter: 100
  },


  effects: {
    *queryInitCards(_, sagaEffects){
      
      const {call, put} = sagaEffects;
      const endPointURI = '/dev/random_joke';
      const puzzle = yield call(request, endPointURI);
      yield put({ type: 'addNewCard', payload: puzzle });

      yield call(delay, 1000);

      const puzzle2 = yield call(request, endPointURI);
      yield put({ type: 'addNewCard', payload: puzzle2 });

    }
  },

  reducers: {
    addNewCard(state, {payload: newCard}){
      const nextId = state.counter + 1;
      const newCardWithId = {...newCard, id: nextId}
      const nextData = state.data.concat(newCardWithId);
      return {
        data: nextData,
        counter: nextId
      }

    }
  }
}