import React, {Component} from 'react';
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';

export default class Employee extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            isLoading: false,
            submitted: false,
            userCompany: [],
            tableRows: [],
            nama: null,
            alamat: null,
            email: null,
            tglLahir: null,
            telp: null,
            company: null,
            unit: null,
            posisi: null,
            tipe: null,
            error: null
        }
    }

    handleSubmit = event =>{
        event.preventDefault();
        this.fetchUserByFilter();
        this.setState({ submitted:true, isLoading:true })
    }

    fetchUserByFilter = async() => {
        const userCom = {
            idUser:{
                nama: this.state.nama,
                alamat: this.state.alamat,
                email: this.state.email,
                tglLahir: this.state.tglLahir,
                telp: this.state.telp,
            },
            idCompanyUnitPosisi:{
                idCompany: {
                    nama: this.state.company,
                },
                idUnit: {
                    unit: this.state.unit,
                },
                idPosisi: {
                    posisi: this.state.posisi,
                },
            },
            idTipeUser:{
                tipe: this.state.tipe,
            }
        }
        await axios.post(`http://localhost:8080/usercompany/filter`, userCom, {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => response.data)
        .then(data => {
            this.setState({
                userCompany: data
            })
        })
        .then(async() => {
            this.setState({ tableRows:this.assemblePosts(), isLoading:false })
        })
    }

    assemblePosts= () => {
        console.log(this.state.userCompany)
        let userCompany = this.state.userCompany.map((user) => {
            return (
                {
                    namaUser: user.idUser.nama,
                    alamat: user.idUser.alamat,
                    tglLahir: user.idUser.tglLahir,
                    telp: user.idUser.telp,
                    email: user.idUser.email,
                    unit: user.idCompanyUnitPosisi.idUnit == null ? "-" : user.idCompanyUnitPosisi.idUnit.unit,
                    posisi: user.idCompanyUnitPosisi.idPosisi == null ? "-" : user.idCompanyUnitPosisi.idPosisi.posisi,
                    tipeUser: user.idTipeUser.tipe,
                    action: <div><a href="/employee/update" type="" className="btn btn-warning" defaultValue={user} >Edit</a>
                    <a href="" type="" className="btn btn-danger">Delete</a></div>
                }
            )
        });
        console.log(userCompany);
        return userCompany;
    }

    render() {
        const data = {
            columns: [
                {
                    label: 'Nama User',
                    field: 'namaUser'
                },
                
                {
                    label: 'Alamat',
                    field: 'alamat'
                },
                {
                    label: 'Tanggal Lahir',
                    field: 'tglLahir'
                },
                {
                    label: 'Telepon',
                    field: 'telp'
                },
                {
                    label: 'Email',
                    field: 'email'
                },
                {
                    label: 'Unit',
                    field: 'unit'
                },
                {
                    label: 'Posisi',
                    field: 'posisi'
                },
                {
                    label: 'Tipe User',
                    field: 'tipeUser'
                },
                {
                    label: 'Action',
                    field: 'action'
                },
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
                                    <h4 className="page-title">List of Employee</h4>
                                    <ol className="breadcrumb">
                                        <li>
                                            <a href="#">Employee</a>
                                        </li>
                                        <li>
                                            <a href="#">List</a>
                                        </li>
                                        <li className="active">
                                            Employee List
                                        </li>
                                    </ol>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card-box table-responsive">
                                        <h4 className="m-t-0 header-title"><b>Employee List</b></h4>
                                        <form className="form-horizontal" id="basic-form" onSubmit={this.handleSubmit}>
                                            <div className="form-row">
                                                <div className="form-group">
                                                    <button type="submit" className="btn btn-primary">
                                                        { isLoading &&  <i className="fa fa-refresh fa-spin"> </i> }
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