import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { Grid } from 'antd-mobile'
import './avator.css'

const mapStateToProps = function (state) {
  return {user: state.user}
}

const gridData = Array.from(new Array(15)).map((_val, i) => {
  return {
    icon: require(`./imgs/avator${i+1}.jpg`),
    text: `头像${i}`
  }
})

@connect(mapStateToProps)
class Avator extends  React.Component {
  static propTypes = {
    onClick: PropTypes.func 
  }

  constructor (props) {
    super(props)
    this.state = {
      avator: ''
    }
  }
  render () {
    return (
     <div>
      <div className='avator-container'>
         {this.state.avator? <img className='avator-img' src={this.state.avator}/>: null}<span className='avator-username'>{this.props.user.user}</span>
      </div>  
      <Grid onClick={(el, index) => {
         this.setState({avator: el.icon});
         if (typeof this.props.onClick === 'function') {
           this.props.onClick(el, index)
         }
       }} data={gridData} columnNum={5} /> 
    </div>
    )
  }
}

export default Avator