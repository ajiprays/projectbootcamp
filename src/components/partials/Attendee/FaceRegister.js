import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  loadModels,
  getFullFaceDescription,
  isFaceDetectionModelLoaded
} from '../../../api/face';
import * as Constant from '../../_helpers/constant';

const MaxWidth = 600;

const INIT_STATE = {
  url: null,
  imageURL: [],
  fullDesc: [],
  imageDimension: null,
  error: null,
  loading: false
};

class FaceRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INIT_STATE,
      showDescriptors: false,
      WIDTH: null,
      HEIGHT: 0,
      isModelLoaded: !!isFaceDetectionModelLoaded()
    };
  }

  componentWillMount() {
    this.resetState();
    let _W = document.documentElement.clientWidth;
    if (_W > MaxWidth) _W = MaxWidth;
    this.setState({ WIDTH: _W });
    this.mounting();
  }

  mounting = async () => {
    await loadModels();
  };

  handleFileChange = async event => {
    this.resetState();
    this.setState({loading: true})
    await Promise.all(Array.from(event.target.files).map(async file =>(
      await this.setState(prevState => ({
        imageURL: [...prevState.imageURL, URL.createObjectURL(file)],
      }))
    )));
    this.handleImageChange();
  };

  handleURLChange = event => {
    this.setState({ url: event.target.value });
  };

  handleButtonClick = event => {
    event.preventDefault();
    var tempInside = [];
    var temp = [];
    this.state.fullDesc.forEach((fd,i) => {
      fd.forEach(fdd => (
        fdd.descriptor.forEach(desc => (
          tempInside.push(desc)
        ))
      ));
      temp.push(tempInside);
      tempInside = [];
    });
    const data = {
        name: JSON.parse(localStorage.getItem('user')).idUser.nama,
        descriptors: temp
    }
    console.log(data);
    fetch(Constant.API_LIVE + '/user/descriptor/register', {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response)); 
  };

  handleImageChange = async (images = this.state.imageURL) => {
    console.log(images);
    await Promise.all(Array.from(images).map(async image =>(
      await this.getImageDimension(image),
      await getFullFaceDescription(image).then(fullDesc => {
        this.setState(prevState =>({fullDesc:[...prevState.fullDesc, fullDesc]}));
      })
    )));
    console.log(this.state.fullDesc);
    this.setState({loading:false});
  };

  getImageDimension = imageURL => {
    let img = new Image();
    img.onload = () => {
      let HEIGHT = (this.state.WIDTH * img.height) / img.width;
      this.setState({
        HEIGHT,
        imageDimension: {
          width: img.width,
          height: img.height
        }
      });
    };
    img.src = imageURL;
  };

  handleDescriptorsCheck = event => {
    this.setState({ showDescriptors: event.target.checked });
  };

  resetState = () => {
    this.setState({ ...INIT_STATE });
  };
  
  render() {
    const {
      WIDTH,
      imageURL,
      fullDesc,
      isModelLoaded,
      error,
      loading
    } = this.state;

    // Display working status
    let status = <p>Status: Model Loaded = {isModelLoaded.toString()}</p>;
    if (!!error && error.toString() === 'TypeError: Failed to fetch') {
      status = (
        <p style={{ color: 'red' }}>Status: Error Failed to fetch Image URL</p>
      );
    } else if (loading) {
      status = <p style={{ color: 'blue' }}>Status: LOADING...</p>;
    } else if (!!fullDesc && !!imageURL && !loading) {
      if (fullDesc.length < 2)
        status = <p>Status: {fullDesc.length} Face Detect</p>;
      if (fullDesc.length > 1)
        status = <p>Status: {fullDesc.length} Faces Detect</p>;
    }

    return (
      <div className="content-page">
        <div className="content">
          <div className="container card-box">
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              {status}
              <div style={{width: WIDTH, padding: 10, border: 'solid', marginTop: 10}}>
                <p>Input Image file</p>
                <input id="myFileUpload" type="file" multiple onChange={this.handleFileChange} accept=".jpg, .jpeg, .png"/>
                <br />
                <div>
                  <button type="submit" onClick={this.handleButtonClick} class="btn btn-success waves-effect waves-light m-l-10 btn-md"> 
                      Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>           
    );
  }
}

export default withRouter(FaceRegister);