import React, { Component } from "react";
import Layout from '../../layout/Layout';

let token = localStorage.getItem('token');
class AnnualRequest extends Component {    
    constructor(props){
        super(props);

        this.handleApprove = this.handleApprove.bind(this);
        this.handleReject = this.handleReject.bind(this);
        this.state = {
            listRequest: [],
            isLoading:true
        };
    }

    handleApprove (annual) {
        console.log(annual);  
        this.Approve(annual);
    };

    handleReject(annual){
        // event.preventDefault();   
        this.Reject(annual);
    };

    Approve(annual){
        fetch('http://localhost:8080/request/Approved', {
                method: 'PATCH',
                body: 
                    JSON.stringify(annual)
                ,
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(res => {res.json()
                
                if (res.ok){
                    window.alert('Permintaan berhasil disetujui')
                    window.location.reload();
                }else{
                    window.alert('gagal')
                    console.log(res.status)
                }})
            .catch(error => {console.error('Error:', error)
                window.alert('gagal')})
            .then(response => console.log('Success:', response)
        ); 
    }

    Reject(annual){
        fetch('http://api.attendees.today/request/Rejected', {
                method: 'PATCH',
                body: 
                    JSON.stringify(annual)
                ,
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(res => {res.json()
                
                if (res.ok){
                    window.alert('Permintaan berhasil ditolak')
                    window.location.reload();
                }else{
                    window.alert('gagal')
                    console.log(res.status)
                }})
            .catch(error => {console.error('Error:', error)
                window.alert('gagal')
            })
            .then(response => console.log('Success:', response),
        ); 
    }

    componentDidMount() {
        fetch('http://localhost:8080/request/company/Request', {
        // fetch('http://api.attendees.today/request/company/Request', {
            method: 'GET',
            
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(res => 
            res.json()
        )
        .then(listRequest => this.setState({
            listRequest ,isLoading:false
        }))
        .catch(error => {
            console.log('parsing failed', error)
            window.alert('Request gagal')
        })       
    }

    render() {
        const {listRequest,isLoading } = this.state;

        return (
            <div>
            <Layout />
            <div className="content-page">

				<div className="content">
                    <div className="container">

						<div className="row">
							<div className="col-sm-12">

								<h4 className="page-title">Request Annual</h4>
								<ol className="breadcrumb">
									<li>
										<a href="#">Annual</a>
									</li>
									<li className="active">
										request
									</li>
								</ol>
							</div>
						</div>

                        
                        <div className="row">
                        	<div className="col-md-12">
                        		<div className="card-box">

                                    <div className="form-group clearfix">
                                        <label className="col-sm-2 control-label" ></label>
                                        <div className="col-lg-6">
                                            <h4 className="m-t-0 header-title"><b>PERMINTAAN CUTI</b></h4>    
                                        </div>
                                    </div>
                        			<p className="text-muted m-b-30 font-13">
										{/* Most common form control, text-based input fields. Includes support for all HTML5 types: <code>text</code>, <code>password</code>, <code>datetime</code>, <code>datetime-local</code>, <code>date</code>, <code>month</code>, <code>time</code>, <code>week</code>, <code>number</code>, <code>email</code>, <code>url</code>, <code>search</code>, <code>tel</code>, and <code>color</code>. */}
									</p>

                                    <div className="table-rep-plugin">
                                    <div className="table-responsive" data-pattern="priority-columns">
                                        <table id="tech-companies-1" className="table  table-striped">
                                            <thead>
                                                <tr>
                                                    <th data-priority="1">NIK</th>
                                                    <th data-priority="2">Nama</th>
                                                    <th data-priority="5">Tanggal Mulai</th>
                                                    <th data-priority="6">Tanggal Selesai</th>
                                                    <th data-priority="7">Keterangan</th>
                                                    <th data-priority="8">Status</th>
                                                    <th></th>
                                                    
                                                </tr>
                                            </thead>
                                            <tbody> 
                                            { isLoading &&  
                                            <tr>
                                            <td ></td>
                                            <td ></td>
                                            <td ></td>
                                            <td ><i className="fa fa-refresh fa-spin"> </i></td>
                                            <td ></td>
                                            <td ></td>
                                            <td></td>
                                            </tr>
                                             }
                                            { listRequest.length >0 ? listRequest.map((annual,index)=> {
                                                return (
                                                    <tr>
                                                        <th data-priority="1">{annual.userCompany.idUser.kode}</th>
                                                        <th data-priority="2">{annual.userCompany.idUser.nama}</th>
                                                        <th data-priority="5">{annual.tglMulai}</th>
                                                        <th data-priority="6">{annual.tglAkhir}</th>
                                                        <th data-priority="7">{annual.keterangan}</th>
                                                        <th data-priority="8">{annual.status.status}</th>
                                                        <th>
                                                            <button type="submit" name ="approve" className="btn btn-primary waves-effect waves-light m-l-10 btn-sm"
                                                                value={annual} onClick={() => this.handleApprove(annual)}>
                                                                <b className="font-bold">Setujui</b> 
                                                            </button>                                                            
                                                            <button type="submit" name="reject" className="btn btn-danger waves-effect waves-light m-l-10 btn-sm" 
                                                                value={index} onClick={() => this.handleReject(annual)}>
                                                                <b className="font-bold" >Tolak</b>
                                                            </button>
                                                        </th>
                                                    </tr> 
                                                )
                                                }):null
                                            }
                                        </tbody>
                                    </table>
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

  
export default AnnualRequest;