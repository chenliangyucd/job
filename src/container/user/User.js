import React from 'react'
import {connect} from 'react-redux'
import { Result, List, Button, WhiteSpace } from 'antd-mobile'
import util from '../../util/util'

const Item = List.Item
const Brief = List.Item.Brief

const mapStateToProps = (state) => {
  return {user: state.user}
}
const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;

@connect(mapStateToProps)
class User extends React.Component {
  constructor (props) {
    super(props)
  }
  loginOut () {
     console.info('loginOut')
  }
  render () {
    return (
      <div>
        <Result
        img={myImg('https://gw.alipayobjects.com/zos/rmsportal/pdFARIqkrKEGVVEwotFe.svg')}
         title={this.props.user.user}
          message={this.props.user.job}
         />
        <div className="sub-title">
          个人信息
        </div>
        <List>
          <Item>
            {this.props.user.job}
          </Item>
          <Item>
            <Brief>{this.props.user.job_condition}</Brief>
          </Item>
          <Item>
            <Brief>{this.props.user.company}</Brief>
          </Item>
        </List>
        <WhiteSpace />
        <Button type="primary" onClick={this.loginOut}>退出登陆</Button>
      </div>
    )
  }
} 

export default User