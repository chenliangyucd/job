import React from 'react'
import {connect} from 'react-redux'
import { NavBar, TabBar, Icon } from 'antd-mobile'
import { Route, Switch} from 'react-router-dom'
import Message from '../message/Message'
import GeniusList from '../geniuslist/GeniusList'
import BossList from '../bosslist/BossList'
import User from '../user/User'
import RedirectUrl from '../../component/redirect/RedirectUrl'
import './dashboard.css'

const mapStateToProps = (state) => {
  return {user: state.user}
}


@connect(mapStateToProps)
class Dashboard extends React.Component {
  constructor (props) {
    super(props)
    
    this.state = {
      selectedTab: this.getSelectTab(),
      typelist: '',
      typename: ''
    }
 
  } 
  getSelectTab () {
    let location = this.props.location.pathname
    let path = this.props.match.path + '/'
     
    return location.substring(path.length)
  }
  historyPush (route) {
    this.props.history.push('/dashboard/' + route)
  }
  getTabBars () {
    let type = this.props.user.type === 0 ? 'bosslist': 'geniuslist'
    let typename = this.props.user.type === 0 ? 'BOSS列表': '牛人列表'
    let typeArray = [
                     {type, typename},
                     {type: 'message', typename: '信息'},
                     {type: 'test', typename: '测试'}, 
                     {type: 'user', typename: '个人中心'} 
                    ]

    return typeArray
  }

  render () {
    let tabBars = this.getTabBars() 
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
        >导航栏</NavBar>
        <Route path='/dashboard/message' component={Message}></Route>
        <Route path='/dashboard/user' component={User}></Route>
        {this.props.user.type === 0? <Route path='/dashboard/bosslist' component={BossList}></Route>:<Route path='/dashboard/geniuslist' component={GeniusList}></Route>}
       
       
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
        >
          {tabBars.map((item) => {
           return (<TabBar.Item
            title={item.typename}
            key={item.type}
            icon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
            />
            }
            selectedIcon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
            />
            }
            selected={this.state.selectedTab === item.type}
            onPress={() => {
              this.setState({
                selectedTab: item.type,
              });
              this.historyPush(item.type);
            }}
          >
          </TabBar.Item>)

          })}

         
        </TabBar>
      </div>
    )
  }
}

export default Dashboard

