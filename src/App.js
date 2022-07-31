import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
const axios = require('axios').default;

class App extends React.Component {
  endPointUrl = 'https://api.unsplash.com';
  

  constructor(props) {
    super(props);
    this.state = {
      images: [],
      open: false,
      imageModelIndex: 0
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
            images.map((image, index) => 
              <div key={image.id} className="">
                <img key={image.id} src={image.urls.small} alt="Loading..." onClick={() => this.setState({open: true, imageModelIndex: index})}></img>
              </div>
            )
          }
        </div>
        <ImageModal
          data={this.state.images[this.state.imageModelIndex]}
          show={this.state.open}
          onHide={() => this.setState({open: false})}
        />
      </div>
    );
  };
  
}

function ImageModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props?.data?.location.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={props?.data?.urls?.full} alt="Loading..."></img>
      </Modal.Body>
      <Modal.Footer>
        <div className='flex flex-col'>
          <div>Height: {props?.data?.height}</div>
          <div>Width: {props?.data?.width}</div>
          <div>Make: {props?.data?.exif?.make}</div>
          <div>Model: {props?.data?.exif?.model}</div>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default App;
