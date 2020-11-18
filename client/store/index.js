import {
  createStore
} from 'redux'

const initialState = {
  isLogin: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'login':
      console.log('login:', action.value);

      return {
        ...state,
        isLogin: action.value
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;