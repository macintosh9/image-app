import './App.css';
import React from 'react';
const axios = require('axios').default;

class App extends React.Component {
  endPointUrl = 'https://api.unsplash.com';

  constructor(props) {
    super(props);
    this.state = {
      images: []
    }
  }

  componentDidMount() {
    axios.get('/photos/random', {
      baseURL: this.endPointUrl,
      headers: {
        'Accept-Version': 'v1',
        'Authorization': 'Client-ID h_uHNthSMyHx38lq4J-KHrHvF2LjLz2bWWjzEQRTzO0'
      },
      params: {
        count: 12
      }
    })
    .then(response => {
      this.setState({
        images: response.data
      })
    });
  }

  render() {
    const images = this.state.images;
    return(
      <div className="container mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {
            images.map(image => <div key={image.id} className=""><img key={image.id} src={image.urls.small} alt="Loading..."></img></div>)
          }
        </div>
      </div>
    );
  };
}

export default App;
