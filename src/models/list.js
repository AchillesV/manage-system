const delay = (millisecond) => {
  return new Promise((resolve) => {
    setTimeout(resolve, millisecond);
  });
};

const request = (url, options) => {
  console.log("url", url)
  return fetch(url, options)
  .then(response => {
    
  return response.json();
  })
  .catch(err => ({ err }));
}

export default {
  namespace: 'cards',
  state:{
    cardsList:[],
    statistic:[]
  },

  effects: {
    *getStatistic(_, sagaEffects){
      
      const {call, put} = sagaEffects;
      const endPointURI = '/dev/chart-data';
      const chart = yield call(request, endPointURI);
      console.log(chart)
      yield put({ type: 'initChart', payload: chart });

    },
    *queryList(_, {call, put}){
      console.log('query')
      const listData = [{
        id: 1,
        name : 'umi',
        desc : '极快的类 Next.js 的 React 应用框架',
        url  : 'https://umijs.org'
      },
      {
        id: 2,
        name : 'antd',
        desc : '一个服务于企业级产品的设计体系',
        url  : 'https://ant.design/index-cn'
      },
      {
        id: 3,
        name : 'antd-pro',
        desc : '一个服务于企业级产品的设计体系',
        url  : 'https://ant.design/index-cn'
      }];
      yield call(delay, 1000); 

      yield put({ type: 'initList', payload: listData });

    },


  },

  reducers: {

    initChart(state,{payload}){
      const statistic = [...payload]
      console.log('statistic',statistic)
      return {
        statistic
      }
    },

    initList(state,{payload}){
      const cardsList = [...payload]
      console.log(cardsList)
      return {
        cardsList
      }
    },
    addOne(state,{payload}){     
      const list=state.cardsList
      const cardsList = [...list, payload]
      return {
        cardsList
      }
    }
  }

}