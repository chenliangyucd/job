import React from 'react'
import {connect} from 'react-redux'
import { NavBar, Icon } from 'antd-mobile'
import { Grid, List, InputItem, Button, Radio, WhiteSpace } from 'antd-mobile'
import RedirectUrl from '../../component/redirect/RedirectUrl'
import Avator from '../../component/avator/Avator'
import axios from 'axios'
import {updateUser} from '../../redux/user.redux'

const Item = List.Item
const mapStateToProps = function (state) {
  return {user: state.user}
}

const actionCreators = {updateUser}


@connect(mapStateToProps,actionCreators)
class Boss extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      job: '',
      company: '',
      salary: '',
      job_condition: '',
      avator: null
    }
    this.completeUser = this.completeUser.bind(this)
  }
  changeState (type, value) {
    this.setState({[type]: value});
  }
  completeUser () {
    let {redirectUrl, ...data} = this.state
   
    this.props.updateUser(data);
  }
  render () {
    return (
      <div>
        <RedirectUrl needLogin={true} needRedirect={true} redux="user"></RedirectUrl>                       
       
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => console.log('onLeftClick')}
          rightContent={[
            <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
            <Icon key="1" type="ellipsis" />
          ]}
          >Boss信息完善</NavBar>
        <Avator onClick={(el, index) => {
          this.changeState('avator', index)
        }}></Avator>
        <List>
          <Item>
            <InputItem onChange={(value)=> {this.changeState('job', value)}}>招聘职位</InputItem>
          </Item>
          <Item>
            <InputItem onChange={(value)=> {this.changeState('company', value)}}>公司名称</InputItem>
          </Item>
          <Item>
            <InputItem onChange={(value)=> {this.changeState('salary', value)}}>职位薪资</InputItem>
          </Item>
          <Item>
            <InputItem onChange={(value)=> {this.changeState('job_condition', value)}}>职位要求</InputItem>
          </Item>     
        </List>
        <Button type="primary" onClick={this.completeUser}>点击完善信息</Button>
      </div>
    )
  }
}


export default Boss