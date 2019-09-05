import React from 'react';
import moment from 'moment';

let token = localStorage.getItem('token');
let user = JSON.parse(localStorage.getItem('user'));

class EmployeeUpdateForm extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleImage=this.handleImage.bind(this);
        this.state = {
            isLoading: true,
            idUserCompany: this.props.location.data.id,
            id: this.props.location.data.idUser.id,
            kode: this.props.location.data.idUser.kode,
            nama: this.props.location.data.idUser.nama,
            alamat: this.props.location.data.idUser.alamat,
            tglLahir: moment(this.props.location.data.idUser.tglLahir, 'LLL').format('YYYY-MM-DD'), 
            telp: this.props.location.data.idUser.telp,
            email: this.props.location.data.idUser.email,
            password: this.props.location.data.idUser.password,
            foto: this.props.location.data.idUser.foto,
            idStatus: this.props.location.data.idUser.idStatus.id,
            createdBy: this.props.location.data.idUser.createdBy,
            createdAt: this.props.location.data.idUser.createdAt,
            updatedBy: this.props.location.data.idUser.updatedBy,
            updatedAt: this.props.location.data.idUser.updatedAt,
            companyUnitPosisi: this.props.location.data.idCompanyUnitPosisi.id,
            company: this.props.location.data.idCompanyUnitPosisi.idCompany.id,
            unit: this.props.location.data.idCompanyUnitPosisi.idUnit == null ? null : this.props.location.data.idCompanyUnitPosisi.idUnit.id,
            posisi: this.props.location.data.idCompanyUnitPosisi.idPosisi == null ? null : this.props.location.data.idCompanyUnitPosisi.idPosisi.id,
            tipeUser: this.props.location.data.idTipeUser.id,
            getUnit:[],
            getPosisi:[],
            getTipeUser:[],
            error: null
        }
    }

    fetchUnit() {
        fetch(`http://localhost:8080/unit`, {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(data =>
            this.setState({
                getUnit: data,
                unit: this.state.unit,
                isLoading: false,
            })
        )
        .catch(error => this.setState({ error, isLoading: false }));         /* fetch Method GET */
    }

    fetchPosisi() {
        fetch(`http://localhost:8080/posisi`, {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(data =>
            this.setState({
                getPosisi: data,
                posisi: this.state.posisi,
                isLoading: false,
            })
        )
        .catch(error => this.setState({ error, isLoading: false }));         /* fetch Method GET */
    }

    fetchTipeUser() {
        fetch(`http://localhost:8080/tipeuser`, {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(data =>
            this.setState({
                getTipeUser: data,
                tipeUser: this.state.tipeUser,
                isLoading: false,
            })
        )
        .catch(error => this.setState({ error, isLoading: false }));         /* fetch Method GET */
    }
    
    handleChange = event =>{
        this.setState({ 
            [event.target.name]: event.target.value
         })
    }

    handleImage=event=>{
        this.setState({file:event.target.files==null ?"null" :event.target.files[0]});
    }

    handleSubmit = event =>{
    event.preventDefault();

    const formData = new FormData();
    // formData.append('file',"");

        const data = {
            id: this.state.idUserCompany,
            idUser: {
                id: this.state.id,
                kode: this.state.kode, 
                nama: this.state.nama, 
                alamat: this.state.alamat, 
                tglLahir: this.state.tglLahir, 
                telp: this.state.telp,
                email: this.state.email,
                password: this.state.password,
                foto: this.state.foto,
                idStatus: {
                    id: this.state.idStatus
                },
                createdBy: this.state.createdBy,
                createdAt: this.state.createdAt,
                updatedBy: this.state.updatedBy,
                updatedAt: this.state.updatedAt,
            },
            idCompanyUnitPosisi: {
                id: this.state.companyUnitPosisi,
                idCompany: {
                    id: this.state.company,
                },
                idUnit: {
                    id: this.state.unit
                },
                idPosisi: {
                    id: this.state.posisi
                }
            },
            idTipeUser: {
                id: this.state.tipeUser
            }
        }

        formData.append('user',JSON.stringify(data));

        fetch('http://localhost:8080/usercompany', { 
            method: 'PUT',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response)); 
    }

    componentDidMount() {
        this.fetchUnit();
        this.fetchPosisi();
        this.fetchTipeUser();
    }
    
    render() {
        const { data } = this.props.location;
        return (
            <div className="content-page">
                <div className="content">
                    <div className="container">
                        <div class="row">
                            <div class="col-sm-12">

                                <h4 class="page-title">Edit Employee</h4>
                                <ol class="breadcrumb">
                                    <li>
                                        <a href="/employee">Employee</a>
                                    </li>
                                    <li class="active">
                                        Edit
                                    </li>
                                </ol>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card-box">
                                    <h4 className="m-t-0 header-title"><b>Edit Employee</b></h4>
                                    <p className="text-muted m-b-30 font-13">
                                    </p>
                                    
                                    <form id="wizard-validation-form" onSubmit={this.handleSubmit}>
                                        <div>
                                            <section>
                                                <div className="form-group clearfix">
                                                    <label className="col-lg-2 control-label" htmlFor="name2">Nama Employee *</label>
                                                    <div className="col-lg-4">
                                                        <input id="name2" name="nama" type="text" defaultValue={this.state.nama} className="required form-control" onChange={this.handleChange} required/>
                                                    </div>
                                                </div>

                                                <div className="form-group clearfix">
                                                    <label className="col-lg-2 control-label " htmlFor="surname2">Alamat *</label>
                                                    <div className="col-lg-4">
                                                        <input id="surname2" name="alamat" type="text" defaultValue={this.state.alamat} className="required form-control" onChange={this.handleChange} required/>
                                                    </div>
                                                </div>

                                                <div className="form-group clearfix">
                                                    <label className="col-lg-2 control-label " htmlFor="email2">Tanggal Lahir *</label>
                                                    <div className="col-lg-4">
                                                        <input id="email2" name="tglLahir" type="date" defaultValue={this.state.tglLahir} className="required form-control" onChange={this.handleChange} required/>
                                                    </div>
                                                </div>

                                                <div className="form-group clearfix">
                                                    <label className="col-lg-2 control-label " htmlFor="userName2">Email *</label>
                                                    <div className="col-lg-4">
                                                        <input className="required email form-control" id="userName2" defaultValue={this.state.email} name="email" type="email" onChange={this.handleChange} required/>
                                                    </div>
                                                </div>

                                                <div className="form-group clearfix">
                                                    <label className="col-lg-2 control-label " htmlFor="address2">Telepon *</label>
                                                    <div className="col-lg-4">
                                                        <input id="address2" name="telp" type="text" defaultValue={this.state.telp} className="required form-control" onChange={this.handleChange} required/>
                                                    </div>
                                                </div>
                                                
                                                {/* <div className="form-group clearfix">
                                                    <label className="col-sm-2 control-label" >Foto</label>
                                                    <div className="col-lg-6">
                                                        <input type="file" data-buttonname="btn-primary" name="foto" onChange= {this.handleImage} placeholder="foto"/>
                                                    </div>
                                                </div> */}

                                            </section>
                                            {data.idTipeUser.tipe === "Super Admin" ? null :
                                            <section>

                                                <div className="form-group clearfix">
                                                    <label className="col-lg-2 control-label " htmlFor="email2">Unit *</label>
                                                    <div className="col-lg-4">
                                                        <select className="form-control" value={this.state.unit} name="unit" onChange={this.handleChange} required>
                                                        {this.state.error ? <p>{this.state.error.message}</p> : null}
                                                        {!this.state.isLoading ? (
                                                            this.state.getUnit.map(u => {
                                                                return (
                                                                    <option key={u.id} value={u.id}>{u.unit}</option>
                                                                );
                                                            })
                                                        ) : null}
                                                        </select>
                                                    </div>
                                                </div>

                                                
                                                <div className="form-group clearfix">
                                                    <label className="col-lg-2 control-label " htmlFor="address2">Posisi *</label>
                                                    <div className="col-lg-4">
                                                        <select className="form-control" value={this.state.posisi} name="posisi" onChange={this.handleChange} required>
                                                        {this.state.error ? <p>{this.state.error.message}</p> : null}
                                                        {!this.state.isLoading ? (
                                                            this.state.getPosisi.map(p => {
                                                                return (
                                                                    <option key={p.id} value={p.id}>{p.posisi}</option>
                                                                );
                                                            })
                                                        ) : null}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="form-group clearfix">
                                                    <label className="col-lg-2 control-label " htmlFor="address2">Tipe User *</label>
                                                    <div className="col-lg-4">
                                                        <select className="form-control" name="tipeUser" value={this.state.tipeUser} onChange={this.handleChange} required>
                                                        {this.state.error ? <p>{this.state.error.message}</p> : null}
                                                        {!this.state.isLoading ? (
                                                            this.state.getTipeUser.map(t => {
                                                                return (
                                                                    <option key={t.id} value={t.id} >{t.tipe}</option>
                                                                );
                                                            
                                                            })
                                                        ) : null}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="form-group clearfix">
                                                    <label className="col-lg-12 control-label ">(*) Required</label>
                                                </div>

                                            </section>
                                            }
                                            <section>
                                                <button type="submit" class="btn btn-success btn-rounded waves-effect waves-light">
                                                    <span class="btn-label"><i class="fa fa-check"></i></span>
                                                    Submit
                                                </button>
                                            </section>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EmployeeUpdateForm;