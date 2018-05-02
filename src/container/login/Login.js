import React from 'react'
import {connect} from 'react-redux'
import { List, InputItem, Button, WhiteSpace} from 'antd-mobile'
import Logo from '../../component/logo/Logo'
import {login} from '../../redux/user.redux'
import RedirectUrl from '../../component/redirect/RedirectUrl'
import './login.css'

const Item = List.Item

const mapStateToProps = function (state) {
  return {user: state.user}
}
const actionCreators = {login}

@connect(mapStateToProps, actionCreators)
class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {user: null, pwd: null}
    this.loginUser = this.loginUser.bind(this)
  }
  loginUser () {
    let loginData = {user: this.state.user, pwd: this.state.pwd}
    this.props.login(loginData) 
  }
  changeState (type, value) {
    this.setState({[type]: value});
  }
  render () {
    return (
      <div>
        <RedirectUrl needRedirect={true} redux="user"></RedirectUrl>
        <Logo></Logo>
        <List>
          <InputItem onChange={(value)=> {this.changeState('user', value)}}>用户名</InputItem>
          <InputItem type='password' onChange={(value)=> {this.changeState('pwd', value)}}>密码</InputItem>
        </List>
        <WhiteSpace/>
        <div className="login-btn-container">
          <Button type="primary" size="small" onClick={this.loginUser} className="login-btn">点击登陆</Button>
          <Button type="primary" size="small" onClick={()=>{this.props.history.push('/register')}} className="login-btn">点击注册</Button>
        </div>
      </div>
    )
  }
  componentDidUpdate () {

  }
}

export default Login