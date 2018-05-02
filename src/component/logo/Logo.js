import React from 'react'
import './logo.css'
class Logo extends React.Component {
  render () {
    return (
      <div className="logo-container">
        <img className="logo-img" src={require('./imgs/people.jpg')}/>
      </div>
    )
  }
}

export default Logo