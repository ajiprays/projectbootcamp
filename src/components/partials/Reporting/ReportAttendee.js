import React, { Component } from 'react';
import DateRangePicker from 'react-daterange-picker';
import "react-daterange-picker/dist/css/react-calendar.css";
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';
const moment = extendMoment(originalMoment);

class ReportAttendee extends Component {
    constructor(props) {
        super(props);

        const today = moment();
        
        this.state = {
            items: [],
            isLoading: false,
            submitted: false,
            value: moment.range(today.clone().subtract(7, "days"), today.clone())
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onSelect = (value, states) => {
        this.setState({ value, states, isOpen: false });
    };

    onToggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.requestAttendee();
        this.setState({ 
            submitted:true, isLoading: true
        });
    }

    requestAttendee = async() => {
        await axios.request('http://localhost:8080/api/attendee-recap/start-date/' + this.state.value.start.format('YYYY-MM-DD') + '/end-date/' + this.state.value.end.format('YYYY-MM-DD'), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => response.data)
        .then(data =>  {
            this.setState({ items: data })
        })
        .then(async() => {
            this.setState({ tableRows:this.assemblePosts(), isLoading:false })
        })
    }
    
    assemblePosts= () => {
        let items = this.state.items.map((attendee) => {
        // console.log(items);
            return (
                {
                    namaUser:attendee.name,
                    unit:attendee.unit,
                    posisi:attendee.posisi,
                    jmlMasuk:attendee.masuk,
                    jmlTerlambat:attendee.terlambat
                }
            )
        });

        return items;
    }

    downloadReportData = () => {
        fetch('http://localhost:8080/api/attendee-recap/start-date/' + this.state.value.start.format('YYYY-MM-DD') + '/end-date/' + this.state.value.end.format('YYYY-MM-DD') + '/report', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            if(response.ok){
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = 'AttendeeReport.pdf';
                    a.click();
                })
            } else {
                console.log(response.status)
            }
            
        }).catch(error => console.log(error))
    }

    render(){
        const data = {
            columns: [
                {
                    label: 'Nama User',
                    field: 'namaUser'
                },
                
                {
                    label: 'Posisi',
                    field: 'posisi'
                },
                {
                    label: 'Unit',
                    field: 'unit'
                },
                {
                    label: 'Jumlah Masuk',
                    field: 'jmlMasuk'
                },
                {
                    label: 'Jumlah Terlambat',
                    field: 'jmlTerlambat'
                }
            ],

            rows:this.state.tableRows,
        }
        const { submitted, isLoading } = this.state;
        return(
            <div>
                <div className="content-page">
                    <div className="content">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="btn-group pull-right m-t-15">
                                        <button type="button" className="btn btn-default dropdown-toggle waves-effect waves-light" data-toggle="dropdown" aria-expanded="false">Export <span className="m-l-5"><i className="fa fa-cog"></i></span></button>
                                        <ul className="dropdown-menu drop-menu-right" role="menu">
                                            <li><a href="#" onClick={this.downloadReportData}>PDF</a></li>
                                            <li><a href="#">CSV</a></li>
                                            <li><a href="#">Excel</a></li>
                                        </ul>
                                    </div>

                                    <h4 className="page-title">Report Attendee</h4>
                                    <ol className="breadcrumb">
                                        <li>
                                            <a href="#">Attendee</a>
                                        </li>
                                        <li>
                                            <a href="#">Report</a>
                                        </li>
                                        <li className="active">
                                            Report Attendee
                                        </li>
                                    </ol>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card-box table-responsive">
                                        <h4 className="m-t-0 header-title"><b>Report Attendee List</b></h4>
                                        <form className="form-horizontal" id="basic-form" onSubmit={this.handleSubmit}>
                                            <div className="form-row">
                                                <div className="form-group clearfix">
                                                    <div className="col-sm-6">
                                                    <label className="control-label">Date Range</label>
                                                        <div className="input-group" >
                                                            <input type="text" className="form-control" onClick={this.onToggle} readOnly placeholder={this.state.value.start.format('YYYY-MM-DD')}/>
                                                                <span className="input-group-addon bg-custom b-0 text-white">to</span>
                                                            <input type="text" className="form-control" onClick={this.onToggle} readOnly placeholder={this.state.value.end.format('YYYY-MM-DD')} />
                                                        </div>

                                                        {this.state.isOpen && (
                                                            <DateRangePicker
                                                                value={this.state.value}
                                                                onSelect={this.onSelect}
                                                                singleDateRange={true}
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <button type="submit" className="btn btn-primary">
                                                        { isLoading &&  <i className="spinner-border"> </i> }
                                                        { isLoading &&  <span> Loading </span> }
                                                        { !isLoading &&  <span> Search </span> }
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                        <hr />
                                        <MDBDataTable striped bordered data={data} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <footer className="footer">
                        © 2016. All rights reserved.
                    </footer>

                </div>
            </div>
        );
    }
}

export default ReportAttendee;