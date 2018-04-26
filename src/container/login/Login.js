import React from 'react'
import {connect} from 'react-redux'
import { List, InputItem, Button, WhiteSpace} from 'antd-mobile'
import Logo from '../../component/logo/Logo'
import {login} from '../../redux/user.redux'
import RedirectUrl from '../../component/redirect/RedirectUrl'

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
        <RedirectUrl needRedirect={false} redirectUrl=''></RedirectUrl>
        <Logo></Logo>
        <List>
          <Item>
            <InputItem onChange={(value)=> {this.changeState('user', value)}}>用户名</InputItem>
          </Item>
          <Item>
            <InputItem type='password' onChange={(value)=> {this.changeState('pwd', value)}}>密码</InputItem>
          </Item>
        </List>
        <Button type="primary" onClick={this.loginUser}>点击登陆</Button>
        <WhiteSpace/>
        <Button type="primary" onClick={()=>{this.props.history.push('/register')}}>跳转到注册页面</Button>
      </div>
    )
  }
  componentDidUpdate () {

  }
}

export default Login