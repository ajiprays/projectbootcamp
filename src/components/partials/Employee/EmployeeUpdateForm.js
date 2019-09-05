import React from 'react';
import moment from 'moment';

let token = localStorage.getItem('token');
let user = JSON.parse(localStorage.getItem('user'));
class EmployeeUpdateForm extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.state = {
            isLoading: true,
            idUserCompany: user.id,
            id: user.idUser.id,
            kode: user.idUser.kode,
            nama: user.idUser.nama,
            alamat: user.idUser.alamat,
            tglLahir: moment(user.idUser.tglLahir, moment.ISO_8601), 
            telp: user.idUser.telp,
            email: user.idUser.email,
            password: user.idUser.password,
            foto: user.idUser.foto,
            idStatus: user.idUser.idStatus.id,
            createdBy: user.idUser.createdBy,
            createdAt: user.idUser.createdAt,
            updatedBy: user.idUser.updatedBy,
            updatedAt: user.idUser.updatedAt,
            companyUnitPosisi: user.idCompanyUnitPosisi.id,
            company: user.idCompanyUnitPosisi.idCompany.id,
            unit: user.idCompanyUnitPosisi.idUnit == null ? "-" : user.idCompanyUnitPosisi.idUnit.id,
            posisi: user.idCompanyUnitPosisi.idPosisi == null ? "-" : user.idCompanyUnitPosisi.idPosisi.id,
            tipeUser: user.idTipeUser.id,
            getUnit:[],
            getPosisi:[],
            getTipeUser:[],
            error: null
        }
    }

    fetchUnit() {
        fetch(`http://localhost:8080/unit`)
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
        fetch(`http://localhost:8080/posisi`)
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
        fetch(`http://localhost:8080/tipeuser`)
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

    handleSubmit = event =>{
    event.preventDefault();

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
        return (
            <div className="content-page">
                <div className="content">
                    <div className="container">
                        <div class="row">
                            <div class="col-sm-12">

                                <h4 class="page-title">Edit Employee</h4>
                                <ol class="breadcrumb">
                                    <li>
                                        <a href="#">Employee</a>
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
                                            {/* <h3>Step 1</h3> */}
                                            <section>
                                                <div className="form-group clearfix">
                                                    <label className="col-lg-2 control-label" htmlFor="name2">Nama Employee *</label>
                                                    <div className="col-lg-4">
                                                        <input id="name2" name="nama" type="text" defaultValue={user.idUser.nama} className="required form-control" onChange={this.handleChange}/>
                                                    </div>
                                                </div>

                                                <div className="form-group clearfix">
                                                    <label className="col-lg-2 control-label " htmlFor="surname2">Alamat *</label>
                                                    <div className="col-lg-4">
                                                        <input id="surname2" name="alamat" type="text" defaultValue={user.idUser.alamat} className="required form-control" onChange={this.handleChange}/>
                                                    </div>
                                                </div>

                                                <div className="form-group clearfix">
                                                    <label className="col-lg-2 control-label " htmlFor="email2">Tanggal Lahir *</label>
                                                    <div className="col-lg-4">
                                                        <input id="email2" name="tglLahir" type="date" defaultValue={user.idUser.tglLahir} className="required form-control" onChange={this.handleChange}/>
                                                    </div>
                                                </div>

                                                <div className="form-group clearfix">
                                                    <label className="col-lg-2 control-label " htmlFor="userName2">Email *</label>
                                                    <div className="col-lg-4">
                                                        <input className="required email form-control" id="userName2" defaultValue={user.idUser.email} name="email" type="email" onChange={this.handleChange}/>
                                                    </div>
                                                </div>

                                                <div className="form-group clearfix">
                                                    <label className="col-lg-2 control-label " htmlFor="address2">Telepon *</label>
                                                    <div className="col-lg-4">
                                                        <input id="address2" name="telp" type="text" defaultValue={user.idUser.telp} className="required form-control" onChange={this.handleChange}/>
                                                    </div>
                                                </div>
                                            </section>
                                            {/* <h3>Step 2</h3> */}
                                            <section>

                                                <div className="form-group clearfix">
                                                    <label className="col-lg-2 control-label " htmlFor="email2">Unit *</label>
                                                    <div className="col-lg-4">
                                                        <select className="selectpicker" data-style="btn-white" value={this.state.unit} name="unit" onChange={this.handleChange}>
                                                        {this.state.error ? <p>{this.state.error.message}</p> : null}
                                                        {!this.state.isLoading ? (
                                                            this.state.getUnit.map(u => {
                                                                return (
                                                                    <option key={u.id} value={u.id}>{u.unit}</option>
                                                                );
                                                            })
                                                        ) : "-"}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="form-group clearfix">
                                                    <label className="col-lg-2 control-label " htmlFor="address2">Posisi *</label>
                                                    <div className="col-lg-4">
                                                        <select className="selectpicker" data-style="btn-white" value={this.state.posisi} name="posisi" onChange={this.handleChange}>
                                                        {this.state.error ? <p>{this.state.error.message}</p> : null}
                                                        {!this.state.isLoading ? (
                                                            this.state.getPosisi.map(p => {
                                                                return (
                                                                    <option key={p.id} value={p.id}>{p.posisi}</option>
                                                                );
                                                            })
                                                        ) : "-"}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="form-group clearfix">
                                                    <label className="col-lg-2 control-label " htmlFor="address2">Tipe User *</label>
                                                    <div className="col-lg-4">
                                                        <select className="selectpicker" data-style="btn-white" name="tipeUser" value={this.state.tipeUser} onChange={this.handleChange}>
                                                        {this.state.error ? <p>{this.state.error.message}</p> : null}
                                                        {!this.state.isLoading ? (
                                                            this.state.getTipeUser.map(t => {
                                                                return (
                                                                    <option key={t.id} value={t.id}>{t.tipe}</option>
                                                                );
                                                            
                                                            })
                                                        ) : "-"}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="form-group clearfix">
                                                    <label className="col-lg-12 control-label ">(*) Required</label>
                                                </div>

                                            </section>
                                            {/* <h3>Step Final</h3> */}
                                            <section>
                                                {/* <div className="form-group clearfix">
                                                    <div className="col-lg-12">
                                                        <input id="acceptTerms-2" name="acceptTerms2" type="checkbox" className="required"/>
                                                        <label htmlFor="acceptTerms-2">I agree with the Terms and Conditions.</label>
                                                    </div>
                                                </div> */}
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