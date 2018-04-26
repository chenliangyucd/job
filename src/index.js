import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import { BrowserRouter, 
	     Route, 
	     Link,
	     Redirect,
	     Switch
	   } from 'react-router-dom'
import reducer from './reducer'
import Login from './container/login/Login'
import Register from './container/register/Register'
import Boss from './container/boss/Boss'
import Genius from './container/genius/Genius'
import Dashboard from './container/dashboard/Dashboard'
/*
function count (state = 0, action) {
   switch(action.type) {
     case "add": 
       return state + 1
     case "minus":
       return state - 1
     default: 
       return 10
   }
}

const stroe = createStore(count);

stroe.subscribe(function () {
   let count = stroe.getState();
   console.log(`现在count数量为${count}`);
});


stroe.dispatch({type: "add"});
stroe.dispatch({type: "add"});
stroe.dispatch({type: "minus"});
*/

const store = createStore(reducer, compose(applyMiddleware(thunk), window.devToolsExtension? window.devToolsExtension(): ()=>{}))

/* 这种组件叫做无状态组件
function ErYing (props) {
  console.info(props)
  console.info(props.match.params.location)
  return (<div>二营</div>)
}

function SanYing () {
  return <div>三营</div>
}
*/
// 这里要做的是，index.js是一个第一个页面的路由，只设置第一层页面的路由，如果没有访问到。默认到那种dashboard页面，说白了就是入口页面
ReactDOM.render((
	  <Provider store={store}>
	    <BrowserRouter>
	      <div>
	        <Switch>
            <Route path='/login' component={Login}></Route>         
            <Route path='/register' component={Register}></Route>
            <Route path='/boss' component={Boss}></Route>
            <Route path='/genius' component={Genius}></Route>
            <Route path='/dashboard' component={Dashboard}></Route>
            <Redirect to='/login'></Redirect>
          </Switch>
	      </div>
	    </BrowserRouter>
	  </Provider>
	), document.getElementById('root'))

registerServiceWorker()

// function render() {
  //ReactDOM.render(<App stroe={stroe} />, document.getElementById('root'));	
// }
// render();

// stroe.subscribe(render);


