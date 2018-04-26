const ACTION_ADD = 'add';
const ACTION_MINUS = 'minus';


function count (state = 0, action) {
  switch(action.type) {
    case ACTION_ADD: 
      return state + 1
    case ACTION_MINUS:
      return state - 1
    default: 
      return 10
  }
}



// 返回dispatcher的action参数
// action create
function action_add () {
  return {type: ACTION_ADD}
}

function action_minus () {
  return {type: ACTION_MINUS}
}


function actionAsync () {
  return (dispatch) => {
    setTimeout(()=>{
       dispatch(action_add());
    }, 1000);
  }
}


export {count, action_add, action_minus, actionAsync}
