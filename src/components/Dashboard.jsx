import React from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    axios.get('index/dashboard').then((req, res) => {
      this.setState({data: req.data})
    })
  }

  render() {
    return (
      <div>
        <Sidebar/>
      </div>
    )
  }
}

export default Dashboard;