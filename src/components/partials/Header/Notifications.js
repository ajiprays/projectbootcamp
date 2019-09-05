import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Profile from './Profile';
import axios from 'axios';
import "./ScrollbarPage.css";
import * as Constant from '../../_helpers/constant';

let user = JSON.parse(localStorage.getItem('user'));

class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        axios.request(Constant.API_LIVE + '/notification', {
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
        .catch(error => console.log('Error: ', error));
    }

    render(){
        const { items } = this.state;
        const scrolleContainerStyle = { width:"300px auto", maxHeight: "200px" };
        return(
            <li className="dropdown top-menu-item-xs">
                <a href="#" data-target="#" className="dropdown-toggle waves-effect waves-light" data-toggle="dropdown" aria-expanded="true">
                    <i className="icon-bell"></i> 
                    {
                        items.length > 0 ? 
                        <span className="badge badge-xs badge-danger">{ items.length }</span>
                        : <span></span>
                    }
                </a>
                <ul className="dropdown-menu dropdown-menu-lg">
                    <li className="notifi-title">Notification</li>
                    <li className="list-group slimscroll-noti notification-list">
                        <div className="scrollbar mx-auto" style={scrolleContainerStyle}>
                            {
                                items.length > 0 ? items.map((notif, index) => {
                                    // console.log(notif.request.id);
                                    return(
                                        <Link to={{
                                            pathname: "/annual/detail",
                                            data: notif
                                        }} className="list-group-item" key={notif.id} >
                                            <div className="media">
                                                <div className="pull-left p-r-10">
                                                    <em className="fa fa-check-square-o noti-primary"></em>
                                                </div>
                                                <div className="media-body">
                                                    <h5 className="media-heading">Annual Request</h5>
                                                    <p className="m-0">
                                                        <small>From: { notif.request.createdBy.nama }</small>
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                }) : 
                                <div className="list-group-item text-right">
                                    <small className="font-1000">You don't have new notification</small>
                                </div>
                            }
                        </div>
                    </li>
                    <li>
                        <a href="#" className="list-group-item text-right">
                            <small className="font-600">See all notifications</small>
                        </a>
                    </li>
                </ul>
            </li>
        );
    }
}

export default Notifications;