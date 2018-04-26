import axios from 'axios'

const USER_INFO = 'user_info'
const defaultState = {user: null, type: null, isAuth: false}

function user (state = defaultState, action) {
  switch (action.type) {
    case USER_INFO:
      return {...state, ...action.payload, isAuth: true, redirectUrl: action.redirectUrl}
    default:
      return state
  }

}

function userInfo (userInfo) {
  return {type: USER_INFO, payload: userInfo}	
}

function login (loginData) {
  return (dispatch) => {
    axios.post('/user/login', loginData).then(function (response) {
       let data = response.data
       if (data.code === 0) {
         dispatch({type: USER_INFO, payload: data.data})
       }    
    })
  }
}

function updateUser (userData) {
  console.info(userData)
  return (dispatch) => {
    axios.post('/user/update', userData).then(function (response) {
      let data = response.data
      console.info(data)
      if (data.code === 0) {
        dispatch({type: USER_INFO, payload: data.data, redirectUrl: '/dashboard'})
      }    
    })
  }
}

function register (registerData) {
  return (dispatch) => {
    axios.post('/user/register', registerData).then(function (response) {
      let data = response.data
      let redirectUrl = ''
      if (data.code === 0) {
        if (data.data.type === 0) {
          redirectUrl = '/genius'
        } else if (data.data.type === 1) {
          redirectUrl = '/boss'
        }
        dispatch({type: USER_INFO, payload: data.data, redirectUrl})
      }
    }) 
  }	
}

export {user, register, login, userInfo, updateUser}