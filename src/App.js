import React from 'react'
import {Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {action_add, action_minus, actionAsync} from './index.redux'
import {loginOut} from './Auth.redux'
import {
       Route, 
       Link,
       Redirect,
       Switch
     } from 'react-router-dom';

const mapStateToProps = function (state) {
  return {num: state.count, ...state.user}
}

const actionCreators = {action_add, action_minus, actionAsync, loginOut}

@connect(mapStateToProps, actionCreators)
class App extends React.Component {
  constructor (props) {
    super(props)
    this.testStroe = this.testStroe.bind(this)
    this.testLoginout = this.testLoginout.bind(this)
  }
  testStroe () {
    console.info(this.props)
    // this.props.stroe.dispatch(action_add());
    this.props.actionAsync()   
  }
  testLoginout () {
    this.props.loginOut();
  }
  render () {
    return (
      <div>
        {this.props.isLogin? <button onClick={this.testLoginout}>登出</button>: <Redirect to="/auth"></Redirect>}
        <ul>
          <li>
            <Link to="/app/yiying">一营</Link>
          </li>
          <li>
            <Link to="/app/qibinglian">骑兵连{this.props.isLogin + ''}</Link>
          </li>
        </ul>
        <h1 onClick={this.testStroe}>我是来测试的{this.props.num}</h1>
        <Route path='/app/yiying' component={YiYing}></Route>  
        <Route path='/app/qibinglian' component={QiBingLian}></Route>

        <Button type='primary'>size</Button>
      </div>
    )
  }
}


function QiBingLian (props) {
  return (<div>骑兵连老大{props.boss}</div>)
}


class YiYing extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      solider: ['陈亮宇', '呵呵', '呵呵1']
    }
    this.testClick = this.testClick.bind(this);
  }
  testClick () {
    alert('老子是来测试点击事件的!');
    this.setState({
      solider: ['陈亮宇1', '李浩然呵呵1', '小婊砸1']
    });
  }
  render () {
    return (
      <div>
        <div>123</div>
        <ul onClick={this.testClick}>
          {this.state.solider.map((name, index) => {
            return <li key={index}>{name}{index}</li>
          })}
        </ul>
      </div>
    )
  }
}



// App = connect(mapStateToProps, actionCreators)(App)

export default App
