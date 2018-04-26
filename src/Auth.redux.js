import axios from 'axios'
	
const LOGIN = 'login'
const LOGIN_OUT = 'login_out'
const LOGIN_ASYNC = 'login_async'
const defaultState = {user: '', age: 0, isLogin: false};

function user (state = defaultState, action) {
   switch (action.type) {
     case LOGIN:
       return {...state, user: 'chenliangyu', age: 18, isLogin: true}
     case LOGIN_OUT:  
       return defaultState
     case LOGIN_ASYNC:
       console.info('打印action.payload');
       console.info(action.payload);
       return {...state, ...action.payload, isLogin: true}
     default: 
       return state
   }  
}

function login() {
  return {type: LOGIN}
}

function loginOut() {
  return {type: LOGIN_OUT}
}

function loginAsync() {
  return (dispatch) => {
    axios.get('/data?user=chenliangyu').then((response)=>{
      dispatch({type: LOGIN_ASYNC, payload: response.data[0]})
    })
  }
} 



export {user, login, loginOut, loginAsync}