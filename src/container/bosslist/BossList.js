import React from 'react'
import axios from 'axios'
import {WingBlank, Card, WhiteSpace } from 'antd-mobile'

class BossList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      peopleList: []
    }
  } 

  render () {
    return (  
      <div>   
        {this.state.peopleList.map((people) => {             
         return (<WingBlank size="lg">
            <WhiteSpace size="lg" />
            <Card>
              <Card.Header
              title={people.user}
              thumb="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png"
              extra={people.company}
              />
              <Card.Body>
                <div>{people.job_condition}</div>
                <div>{people.salary}</div>
              </Card.Body>
            </Card>
            <WhiteSpace size="lg" />
          </WingBlank>)
        })}
      </div>
    )
  }

  componentDidMount () {
    axios.get('/user/list?type=1').then((response) => {
      let data = response.data
      this.setState({
        peopleList: data.data
      })
    })
  }
}

export default BossList

