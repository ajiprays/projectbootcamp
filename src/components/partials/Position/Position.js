import React, { Component } from 'react';
import axios from 'axios';
import { MDBDataTable } from 'mdbreact';
import { NavLink } from 'react-router-dom';
import Modal from 'react-responsive-modal';

class Position extends Component {
    constructor(props) {
        super(props);

        this.state = {
            requiredItem: 0,
            items: [],
            isLoading: false,

            open: false,
            selectedPost: null
        }

    }

    onOpenModal = index => {
        // console.log(index);
        this.setState({
            open: true,
            selectedPost: index
        })
    }

    onCloseModal = () => {
        this.setState({ open:false })
    }

    renderModal = () => {
        if (this.state.selectedPost !== null) {
            const item = this.state.items[this.state.selectedPost]
            return (
                <div className="modal-dialog modal-dialog-centered">
                    {/* <form key={item.id}> */}
                    <div className="modal-body">
                        <div className="row"> 
                            <div className="col-md-12">
                                <div className="form-group clearfix">
                                    <div className="col-sm-12">
                                        <label>Position</label>
                                        <input type="text" name="posisi" readOnly value={item.posisi} className="form-control" />
                                    </div>
                                </div>
                                <div className="form-group clearfix">
                                    <div className="col-sm-12">
                                        <label>Status</label>
                                        <input type="text" name="status" readOnly value={item.idStatus.status} className="form-control" />
                                    </div>
                                </div>
                                <div className="form-group clearfix">
                                    <div className="col-sm-12">
                                        <label>Created By</label>
                                        <input type="text" name="createdBy" readOnly value={item.createdBy.nama} className="form-control" />
                                    </div>
                                </div>
                                <div className="form-group clearfix">
                                    <div className="col-sm-12">
                                        <label>Created At</label>
                                        <input type="text" name="createdAt" readOnly value={item.createdAt} className="form-control" />
                                    </div>
                                </div>
                                <div className="form-group clearfix">
                                    <div className="col-sm-12">
                                        <label>Updated By</label>
                                        <input type="text" name="status" readOnly value={item.updatedBy} className="form-control" />
                                    </div>
                                </div>
                                <div className="form-group clearfix">
                                    <div className="col-sm-12">
                                        <label>Updated At</label>
                                        <input type="text" name="status" readOnly value={item.updatedAt} className="form-control" />
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" onClick={this.onCloseModal} className="btn btn-danger waves-effect waves-light">Close</button>
                    </div>
                    {/* </form> */}
                </div>
            );
        }
    }

    componentDidMount = async() => {
        await axios.request('http://localhost:8080/posisi', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => response.data)
        .then(data => {
            this.setState({ items: data })
        })
        .then(async() => {
            this.setState({ tableRows:this.assemblePosts() })
            console.log(this.state.tableRows);
        })
    }

    assemblePosts = () => {
        let items = this.state.items.map((position, index) => {
            return(
                {
                    nomor: index + 1,
                    posisi: position.posisi,
                    status: position.idStatus.status,
                    action: <div className="button-list"><button type="button" data-toggle="modal" data-target="#myModal" key={position.id} onClick={() => this.onOpenModal(index)} className="btn btn-icon waves-effect btn-default waves-light"> <i className="fa fa-eye"></i> </button>
                    <NavLink to={{ pathname: "/position/form-edit", data: position }} key={index} className="btn btn-icon waves-effect waves-light btn-warning"> <i className="fa fa-edit"></i> </NavLink></div>
                }
            );
        });

        return items;
    }

    render(){
        const { open } = this.state;
        const data = {
            columns: [
                {
                    label: '#',
                    field: 'nomor',
                    width: 100
                },
                {
                    label: 'Position',
                    field: 'posisi',
                    width: 150
                },
                {
                    label: 'Status',
                    field: 'status',
                    width: 150
                },
                {
                    label: 'Action',
                    field: 'action',
                    width: 100
                }
            ],

            rows: this.state.tableRows,
        }

        return(
            <div className="content-page">
                <div className="content">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <h4 className="page-title">Position</h4>
                                <ol className="breadcrumb">
                                    <li>
                                        <a href="#">Attendee Application</a>
                                    </li>
                                    <li>
                                        <a href="#">Position</a>
                                    </li>
                                    <li className="active">
                                        Position List
                                    </li>
                                </ol>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card-box table-responsive">
                                    <h4 className="m-t-0 header-title"><b>Position List</b></h4>
                                    <br />
                                    <NavLink to={'/position/form'}><button type="button" className="btn btn-default btn-rounded waves-effect waves-light">Create</button></NavLink>
                                    <hr/>
                                    <div>
                                        <MDBDataTable striped bordered data={data} />
                                    </div>
                                    <div>
                                        <Modal open={open} onClose={this.onCloseModal} center>
                                            <h3>Detail Position</h3>
                                            <div>{this.renderModal()}</div>
                                        </Modal>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="footer">
                    © 2016. All rights reserved.
                </footer>

            </div>
        );  
    }
}

export default Position;
