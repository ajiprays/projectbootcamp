import React, { Component } from 'react';
import Webcam from 'react-webcam';
import { loadModels, getFullFaceDescription, createMatcher } from '../../../api/face';
import {Redirect} from 'react-router-dom';
import moment from 'moment';
import * as Constant from '../../_helpers/constant';

const WIDTH = 420;
const HEIGHT = 420;
const inputSize = 160;

class Attendee extends Component {
    constructor(props) {
        super(props);
        this.webcam = React.createRef();
        this.state = {
            user: localStorage.getItem('user'),

            fetch: false,
            redirect: false,
            capture: true,
            time: new Date(),

            descriptors: null,
            detections: null,
            match: null,
            fullDesc: null,
            faceMatcher: null,
            facingMode: null,
            users: {
                user: null
            },
            absen: {
                jam: null,
                lokasi: null
            }
        };
    }

    componentWillMount() {
        loadModels();
        this.setInputDevice();
        this.matcher();
        setInterval(() => this.currentTime(), 500)
    }

    currentTime(){
        this.setState({
            time: new Date()
        })
    }

    setInputDevice = () => {
        navigator.mediaDevices.enumerateDevices().then(async devices => {
          let inputDevice = await devices.filter(
            device => device.kind === 'videoinput'
          );
          if (inputDevice.length < 2) {
            await this.setState({
              facingMode: 'user'
            });
          } else {
            await this.setState({
              facingMode: { exact: 'environment' }
            });
          }
          this.startCapture();
        });
    };

    matcher = async () => {
        const getter = {
            name: JSON.parse(localStorage.getItem('user')).idUser.nama
        }
        await fetch(Constant.API_LIVE + '/user/descriptor', {
            method: 'POST',
            body: JSON.stringify(getter),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(async response => await response.json())
        .then(async data =>
            await this.setState({
                users: {
                    user:data
                }
            })
        );
        
        const faceMatcher = await createMatcher(this.state.users);
        this.setState({ faceMatcher });
        console.log(this.state.users);
        console.log(this.state.faceMatcher);
    };

    getDescription = async () => {
        if(!!this.state.fullDesc) {
            await this.setState({
                descriptors: this.state.fullDesc.map(fd => fd.descriptor),
                detections: this.state.fullDesc.map(fd => fd.detection)
            });
            if(!!this.state.descriptors && !!this.state.faceMatcher){
                let match = await this.state.descriptors.map(descriptor => 
                    this.state.faceMatcher.findBestMatch(descriptor)
                );
                this.setState({ match });

                if(this.state.match!=null && this.state.fetch==false){
                    this.setState({capture: false});
                    this.setState({fetch: true});
                    this.checkGeo();
                }
            }
        }
    };

    checkGeo = async () =>{
        if(this.state.match[0]._label===JSON.parse(localStorage.getItem('user')).idUser.nama){
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.setLocation);
            }
        }
        else{
            console.log("coba lagi");
            this.setState({capture: true});
        }
    }

    setLocation = async (position) => {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;
        const __KEY = 'AIzaSyCsjiM8-cwH_7aFchKjbZU-pugT_ptG0sU';
        const latlng = lat + "," + lng;
               
        await fetch( `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${__KEY}` )
        .then(async res => await res.json())
        .then(async data => await this.setState({
            absen: {
                jam: moment().format('YYYY-MM-DD hh:mm:ss'),
                lokasi: data.results[1].formatted_address
            }
        }))
        await this.absen();
    }

    absen = async () =>{
        console.log(this.state.absen);
        await fetch( Constant.API_LIVE + '/user/absen', {
            method: 'POST',
            body: JSON.stringify(this.state.absen),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(async res => await res.json());
        this.setState({redirect: true});
    }

    startCapture = () => {
        this.interval = setInterval(() => {
            if(this.state.capture){
                this.capture();
            }
        }, 1500);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    capture = async () => {
        if (!!this.webcam.current) {
            await getFullFaceDescription(
              this.webcam.current.getScreenshot(),
              inputSize
            ).then(fullDesc => this.setState({ fullDesc }));
        }
        console.log(this.state.fullDesc);
        await this.getDescription();
    };

    render(){
        const {facingMode, redirect} = this.state;
        let videoConstraints = null;
        let camera = '';

        if(redirect){
            return <Redirect to='/' />;
        }

        if(!!facingMode) {
            videoConstraints = {
                width: WIDTH,
                height: HEIGHT,
                facingMode: facingMode
            };
            if(facingMode === 'user'){
                camera = 'Front';
            } else {
                camera = 'Back';
            }
        }
        return(
            <div className="content-page">
                <div className="content">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <h4 className="page-title">Dashboard</h4>
                                <ol className="breadcrumb">
                                 <li>
                                     <a href="#">Attendee Application</a>
                                 </li>
                                 <li>
                                     <a href="#">Attendee</a>
                                 </li>
                             </ol>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <ul class="nav nav-tabs tabs">
                                    <li class="active tab">
                                        <a href="#clock-in" data-toggle="tab" aria-expanded="false"> 
                                            <span class="visible-xs"><i class="fa fa-home"></i></span> 
                                            <span class="hidden-xs">Attendee</span> 
                                        </a> 
                                    </li>
                                </ul> 
                                
                                <div className="card-box table-responsive" id="clock-in">
                                    <h4 className="m-t-0 header-title"><b>Attendee In</b></h4>
                                    <h5 className="m-t-0 header-title">{this.state.time.toLocaleTimeString()}</h5>
                                    <div className="Camera" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                        <div style={{width: WIDTH, height: HEIGHT}}>
                                            <div style={{ position: 'relative', width: WIDTH }}>
                                                {!!videoConstraints ? (
                                                <div style={{ position: 'absolute' }}>
                                                    <Webcam 
                                                        audio={false}
                                                        width={WIDTH}
                                                        height={HEIGHT}
                                                        ref={this.webcam}
                                                        screenshotFormat="image/jpeg"
                                                        videoConstraints={videoConstraints}
                                                    />
                                                </div>
                                                ) : null }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Attendee;