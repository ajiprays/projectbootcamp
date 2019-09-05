import React, { Component } from "react";
import { MDBDataTable } from 'mdbreact';
import Layout from '../../layout/Layout';
import axios from 'axios';

class ListAnnual extends Component {
    constructor(props){
        super(props);
        this.state = {
            items: [],
            isLoading: true,
            tableRows: [],
        };
    }


    componentWillMount=async() => {
        await axios.request('http://localhost:8080/request/Approved', {
        // await axios.request('http://api.attendees.today/request/company/Approved', {
            method: 'GET',

            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => response.data)
            .then(data => {
                this.setState({ items: data })
            })
            .then(async() => {
                this.setState({ tableRows:this.assemblePosts(), isLoading:false });
            })

    }
    // componentWillMount=async() => {
    //     await axios.get(url)
    //     .then(response => response.data)
    //     .then(data => {
    //         this.setState({ items: data })
    //     })
    //     .then(async() => {
    //         this.setState({ tableRows:this.assemblePosts(), isLoading:false });
    //     })
    // }

    assemblePosts= () => {
        let items = this.state.items.map((annual) => {
            return (
                {
                    nik:annual.userCompany.idUser.kode,
                    nama:annual.userCompany.idUser.nama,
                    tglMulai:annual.tglMulai,
                    tglAkhir:annual.tglAkhir,
                    keterangan:annual.keterangan,
                    status:annual.status.status
                }

            )
        });

        return items;
    }

    render() {
        const data = {
            columns: [
                {
                    label: 'Nik',
                    field: 'nik'
                },
                {
                    label: 'Nama',
                    field: 'nama'
                },
                {
                    label: 'Tanggal Mulai',
                    field: 'tglAwal'
                },
                {
                    label: 'Tanggal Selesai',
                    field: 'tglAkhir'
                },
                {
                    label: 'Keterangan',
                    field: 'keterangan'
                },
                {
                    label: 'Status',
                    field: 'status'
                }
            ],

            rows:this.state.tableRows,
        }
        return (
            <div>
                <Layout />
                <div className="content-page">
                    <div className="content">
                        <div className="container">

                            <div className="row">
                                <div className="col-sm-12">

                                    <h4 className="page-title">Annual List</h4>
                                    <ol className="breadcrumb">
                                        <li>
                                            <a href="#">Annual</a>
                                        </li>
                                        <li className="active">
                                            List
                                        </li>
                                    </ol>
                                </div>
                            </div>


                            <div className="card-box table-responsive" id="shift-list">
                                <h4 className="m-t-0 header-title"><b>Daftar Cuti Karyawan </b></h4>
                                <MDBDataTable striped bordered data={data} />
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        );
    }


}
export default ListAnnual;