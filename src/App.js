import './App.css';
import React from 'react';
const axios = require('axios').default;

class App extends React.Component {
  endPointUrl = 'https://api.unsplash.com';

  componentDidMount() {
    axios.get('/photos/random', {
      baseURL: this.endPointUrl,
      headers: {
        'Accept-Version': 'v1',
        'Authorization': 'Client-ID h_uHNthSMyHx38lq4J-KHrHvF2LjLz2bWWjzEQRTzO0'
      },
      params: {
        count: 9
      }
    })
    .then(response => {
      console.log(response);
    })
  }

  render() {
    return(
      <div className="container mx-auto">
        <div className="flex flex-row">
          <div className="basis-1/3">01</div>
          <div className="basis-1/3">02</div>
          <div className="basis-1/3">03</div>
        </div>
        <div className="flex flex-row">
          <div className="basis-1/3">01</div>
          <div className="basis-1/3">02</div>
          <div className="basis-1/3">03</div>
        </div>
        <div className="flex flex-row">
          <div className="basis-1/3">01</div>
          <div className="basis-1/3">02</div>
          <div className="basis-1/3">03</div>
        </div>
      </div>
    );
  };
}

export default App;
