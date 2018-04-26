import React from 'react'
import {connect} from 'react-redux'
import { List, InputItem, Button, Radio, WhiteSpace } from 'antd-mobile'
import {user, register} from '../../redux/user.redux'
import Logo from '../../component/logo/Logo'
import RedirectUrl from '../../component/redirect/RedirectUrl'

const Item = List.Item
const RadioItem = Radio.RadioItem


const mapStateToProps = function (state) {
  return {user: state.user}
}

const actionCreators =  {register}

@connect(mapStateToProps, actionCreators)
class Register extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      user: '',
      pwd: '',
      type: 0
    }
    this.changeState = this.changeState.bind(this)
    this.registerUser = this.registerUser.bind(this)
  }
  changeState (type, value) {
    this.setState({[type]: value})
  }
  registerUser () {
    this.props.register({...this.state});
  }
  render () {
    const radioData = [
      {value: 0, label: '牛人'},
      {value: 1, label: 'boss'}
    ]
    return (
      <div>
        <RedirectUrl needRedirect={true} redux="user"></RedirectUrl>
        <Logo></Logo>
        <List>
          <Item>
            <InputItem onChange={(value)=> {this.changeState('user', value)}}>用户名</InputItem>
          </Item>
          <Item>
            <InputItem type='password' onChange={(value)=> {this.changeState('pwd', value)}}>密码</InputItem>
          </Item>
          <Item>
            <InputItem>测试</InputItem>
          </Item>
          <Item>
            {
              radioData.map((radioItem) => {
                return <RadioItem key={radioItem.value} checked={this.state.type === radioItem.value} onClick={()=>{this.changeState('type', radioItem.value)}}>{radioItem.label}</RadioItem>
              })
            }
          </Item>
        </List>
        <Button type="primary" onClick={this.registerUser}>点击注册</Button>
        <WhiteSpace/>
        <Button type="primary" onClick={()=>{this.props.history.push('/login')}}>跳转登陆页面</Button>
      </div>
    )
  }

}

export default Register





