import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
const axios = require('axios').default;

/**
 * Main component of the application.
 */
class App extends React.Component {
  /** Base url of the unsplash api. */
  unsplashBaseUrl = 'https://api.unsplash.com';

  /**
   * The application state is defined.
   * The state contains all the images,
   * the current index of an image that is displayed in an image
   * and if the model is opened or closed.
   * @param {*} props React props.
   */
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      open: false,
      imageModelIndex: 0
    }
  }

  /**
   * Load the first batch of images from usplash during the mount phase.
   */
  componentDidMount() {
    this.loadImages();
  }

  /**
   * Load images from usplash and put them in the application state.
   */
  loadImages() {
    axios.get('/photos/random', {
      baseURL: this.unsplashBaseUrl,
      headers: {
        'Accept-Version': 'v1',
        'Authorization': 'Client-ID h_uHNthSMyHx38lq4J-KHrHvF2LjLz2bWWjzEQRTzO0'
      },
      params: {
        count: 12
      }
    })
    .catch(error => {
      console.error(error);
    })
    .then(response => {
      this.setState({
        images: [...this.state.images, ...response.data]
      })
    });
  }

  render() {
    const images = this.state.images;
    return(
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {
            images.map((image, index) => 
              <div key={image.id} className="">
                <img key={image.id} src={image.urls.small} alt="Loading..." onClick={() => this.setState({open: true, imageModelIndex: index})}></img>
              </div>
            )
          }
        </div>
        <div className='flex justify-center pt-10'>
          <div><Button variant="primary" onClick={() => this.loadImages()}>Load More</Button></div>
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

/**
 * Open an image in a model and display extra data.
 * @param {*} props Data from a single image.
 */
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
