import {
  createStore,
  applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'
import Pubsub from 'pubsub-js'
const initialState = {
  isLogin: false,
  forums:[]
}
Pubsub.subscribe('requestForums', ()=>{
  wx.request({
    url: 'http://localhost:3000/api/forum/all_forum',
    method: 'GET',
    success(res) {
      console.log(res.data.data);
      
      store.dispatch({
        type: 'getForums',
        value: res.data.data
      });
    },
    fail(error) {
      console.log(error);
    }
  })
})
export const requestForums = async ()=>{
  wx.request({
    url: 'http://localhost:3000/api/forum/all_forum',
    method: 'GET',
    success(res) {
      dispatch({
        type: 'getForums',
        value: res.data.data
      });
    },
    fail(error) {
      console.log(error);
    }
  })
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'login':
      console.log('login:', action.value);

      return {
        ...state,
        isLogin: action.value
      };
    case 'getForums':
        console.log('getForums:', action.value);
        return {
          ...state,
          forums: action.value
        };
    default:
      return state;
  }
}
const store = createStore(reducer,applyMiddleware(thunk));
export default store;