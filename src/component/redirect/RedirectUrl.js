import React from 'react'
import {withRouter, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'
import {userInfo} from '../../redux/user.redux' 

const mapStateToProps = function (state) {
  return {user: state.user}
}

const actionCreators = {userInfo}

@withRouter
@connect(mapStateToProps, actionCreators)
class RedirectUrl extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      ignorePath: ['/login', '/register']	
    }
  }
  needLogin () {
    let path = this.props.match.path 
   
    let index = this.state.ignorePath.indexOf(path)

    if (index !== -1) {
      return null
    }
     
    if (this.props.user.isAuth) {
      return null
    } else {
      axios.post('/user/loginById').then((response) => {
        let data = response.data
        if (data.code === 0) {
          this.props.userInfo(data.data)
        } else { 
          this.props.history.push('/login')
        }   
      })
    }
  }
  
  componentDidMount () {
    // 怕断是否需要登陆
    if (this.props.needLogin) {
      this.needLogin()
    }
    
    if (this.props.needRedirect) {
      this.needRedirect();
    }
  }
  
  /* 可以寄存在一个redux底下，也可以直接传入*/
  needRedirect () {
    // 判断redirectUrl在哪个redux底下
    let redux = typeof this.props.redux === 'string'? this.props[this.props.redux] : undefined
    let redirectUrl = typeof redux === 'object'? redux.redirectUrl : this.props.redirectUrl

    let path = this.props.match.path
    if (typeof redirectUrl === 'string' && redirectUrl.length > 0 && path !== redirectUrl) {
      console.info('execute needRedirect')
      this.props.history.push(redirectUrl)
    }     

  }

  componentDidUpdate () {
     // 怕断是否需要登陆
    if (this.props.needLogin) {
      this.needLogin()
    }
    
    if (this.props.needRedirect) {
      this.needRedirect();
    }

  }

  render () {
    

    return null
  }
}


export default RedirectUrl

