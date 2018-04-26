import React from 'react'
import {connect} from 'react-redux'
import {login, loginAsync} from './Auth.redux'
import {Redirect} from 'react-router-dom';
const mapStateToProps = (state) => {
  return state.user
}

const actionCreators = {login, loginAsync}


@connect(mapStateToProps, actionCreators)
class Auth extends React.Component {
  constructor (props) {
    super(props)
    this.login = this.login.bind(this)
  }
  login () {
    this.props.loginAsync()
    this.props.history.push('/')
  }
  render () {
  	return (
      <div>
        {this.props.isLogin?  <Redirect to="/app"></Redirect>: null}
        <div>
          您还没有登录请点击按钮登录
        </div>
        <div>
          <button onClick={this.login}>点击登录</button>
        </div>
      </div>
    )
  }

}

// 到底如何分配路由来保证有些需要登录的模块，登录过后才可以访问

export default Auth