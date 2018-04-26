import React from 'react'
import axios from 'axios'

class GeniusList extends React.Component {
  constructor (props) {
    super(props)
  } 

  render () {
    return (
      <div>       
         老子是GeniusList
      </div>
    )
  }

  componentDidMount () {
    axios.get('/user/list?type=0').then(function (response) {
      let data = response.data
      console.info(data)
    })
  }
}

export default GeniusList

