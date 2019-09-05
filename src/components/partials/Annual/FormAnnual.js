import React, { Component } from "react";
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import {Redirect} from "react-router-dom";
import * as Constant from '../../_helpers/constant';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';
import { history } from '../../_helpers';
import "./../../auth/SpinnerLoader.css";

const moment = extendMoment(originalMoment);
let user = JSON.parse(localStorage.getItem('user'));

class FormPengajuan extends Component {
    constructor(props,context){
        super(props,context);
        const today = moment(); 
        this.handleRequest = this.handleRequest.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            saldo:[],
            namauser:user.idUser.nama,
            tglMulai:'',
            tglAkhir:'',
            sisaCuti:'',
            keterangan:'',
            value: moment.range(today.clone().add(1,"day"), today.clone().add(1,"day")),
            submitted: false,
            isLoading: false,
            redirect: false,
            loadingData:true
        }    
    }

    handleChange = event => {
        this.setState({
            [event.target.name]:event.target.value,
        })
    }

    handleRequest = event => {
        event.preventDefault(); 
        this.setState({ submitted: true, isLoading: true });
        this.Request();
    }

    onSelect = (value, states) => {
        this.setState({ value, states });
        
    }
    
    componentDidMount() {
        fetch(Constant.API_LIVE +'/annual/saldo', {
            method: 'POST',
            body:JSON.stringify({
                id:{
                    kode:user.idUser.kode
                }
            }),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(res => 
            res.json()
        )
        .then(saldo => this.setState({
            sisaCuti:saldo[0].sisaCuti,loadingData:false
        }))
        .catch(error => {
            console.log('parsing failed', error)
            swal("Failed!", "Failed to get annual leave!", "error")

            history.push("/annual/form")
        })       
    }

    Request(){
        console.log('Success:', this.state.value.start.format("YYYY-MM-DD"))
        console.log('Success:', this.state.value.end.format("YYYY-MM-DD"))
        // fetch(Constant.API_LIVE +'/request', {
        fetch('http://localhost:8080/request', {
                method: 'POST',
                body: JSON.stringify({
                    
                    kode:"",
                    userCompany:{
                        id:user.id,
                        idUser:{
                            id:user.idUser.id
                        }
                    },
                    tglMulai:this.state.value.start.format("YYYY-MM-DD"),
                    tglAkhir:this.state.value.end.format("YYYY-MM-DD"),
                    keterangan:this.state.keterangan
                
                }),
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(res => {res.json()
                if (res.ok){
                    console.log(res.ok) 
                    swal("Success!", "Request Successfully!", "success")

                    history.push("/")
                    this.setState({isLoading:false})
                }else{
                    console.log(res.status)
                    swal("Failled!", "Request Failled!", "erroe")

                    this.setState({isLoading:false})
                }}
                )
            .catch(error => {console.error('Error:', error)
                swal("Failled!", "Request Failled!", "error")
                
                this.setState({isLoading:false})
            }
            )
            .then(response => console.log('Success:', response)     
            ); 
    }

    render() { 
        const { isLoading } = this.state;
        return (
            <div id="render" className="content-page">

                <div className="content">
                    <div className="container">

                        <div className="row">
                            <div className="col-sm-12">

                                <h4 className="page-title">Form Annual</h4>
                                <ol className="breadcrumb">
                                    <li>
                                        <a href="#">Annual</a>
                                    </li>
                                    <li className="active">
                                        Form
                                    </li>
                                </ol>
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card-box">

                                    {
                                    this.state.loadingData && <div>Please wait, getting your data  <i className="spinner-border"> </i></div> }
                                    { !this.state.loadingData && 
                                    <div>
                                            <div className="form-group clearfix">
                                            <label className="col-sm-2 control-label" ></label>
                                            <div className="col-lg-6">
                                                <h4 className="m-t-0 header-title"><b>PENGAJUAN CUTI</b></h4>    
                                            </div>
                                            </div>
                                            <form id="basic-form"  onSubmit={this.handleRequest} >   
                                                
                                                <div className="form-group clearfix">
                                                    <label className="col-sm-2 control-label" >Kode</label>
                                                    <div className="col-lg-6">
                                                        <input type="text" id="kode" name="kode" className="form-control" disabled value={user.idUser.kode} placeholder="NIK"/>
                                                    </div>
                                                </div>
                                            

                                            <div className="form-group clearfix">
                                                <label className="col-md-2 control-label" >Nama</label>
                                                <div className="col-lg-6">
                                                    <input type="text" id="nama" name="nama" className="form-control"  disabled value={this.state.namauser} placeholder="Nama"/>
                                                </div>
                                            </div>

                                            <div className="form-group clearfix">
                                                <label className="col-md-2 control-label" >Sisa Cuti</label>
                                                <div className="col-lg-6">
                                                <label className="col-md-2 control-label" >{this.state.sisaCuti}</label>
                                                </div>
                                            </div>

                                            <div className="form-group clearfix">
                                                <label className="col-md-2 control-label">Tanggal Cuti</label>
                                                <div className="col-lg-6">
                                                    <div>
                                                        <div className="input-group">
                                                            <input type="text" className="form-control" disabled placeholder={this.state.value.start.format("YYYY-MM-DD")} />
                                                            <span className="input-group-addon bg-custom b-0 text-white"> sampai </span>
                                                            <input type="text" className="form-control"disabled  placeholder= {this.state.value.end.format("YYYY-MM-DD")} />
                                                        </div>

                                                        <DateRangePicker
                                                            value={this.state.value}
                                                            onSelect={this.onSelect}
                                                            singleDateRange={true}
                                                            minimumDate={moment().add(1,"days")}
                                                        />
                                                    </div>

                                                    {/* <div class="input-daterange input-group" id="date-range">

                                                            <input type="date" name="tglMulai" className="form-control" onChange={this.handleChange} placeholder="YYYY-MM-DD" />

                                                                <span className="input-group-addon bg-custom b-0 text-white"> sampai </span>

                                                            <input type="date" className="form-control"  name="tglAkhir" onChange={this.handleChange}  placeholder="DD/MM/YYYY" />

                                                        </div> */}
                                                </div>
                                            </div>

                                            <div className="form-group clearfix">
                                                <label className="col-md-2 control-label">Keterangan Cuti</label>
                                                <div className="col-lg-6">
                                                    <textarea className="form-control" name="keterangan" required onChange={this.handleChange} rows="6"></textarea>
                                                </div>
                                            </div>

                                                <div className="form-group clearfix">
                                                    <a className="col-md-2 control-label"   />
                                                    <div className="col-sm-2 control-label">
                                                    </div>
                                                </div>
                                                
                                                <div className="form-group clearfix">
                                                    <label  className="col-sm-6 control-label"></label>
                                                    <div className="col-sm-2 control-label">
                                                        <button type="submit" className="btn btn-default waves-effect waves-light btn-lg" data-style="contract" id="sa-warning" disabled={isLoading}>
                                                        { isLoading &&  <i className="spinner-border">  </i> }
                                                        { isLoading &&  <span> Loading </span> }
                                                        { !isLoading &&  <span> Submit </span> }
                                                        </button>
                                                    </div>
                                                </div>
                                                
                                            </form>
                                        </div>
                                    }
        
                        				</div>                        				
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                        
        );

    }
}

export default FormPengajuan;
