import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Report extends Component {
    render(){
        return(
            <li className="has_sub treeview">
                <a href="#" className="waves-effect"><i className="ti-agenda"></i> <span> Reporting</span> <span className="menu-arrow"></span></a>
                <ul className="list-unstyled treeview-menu">
                    <li><Link to={'/report/attendee'} className="waves-effect">Report Attendee</Link></li>
                    <li><Link to={'/report/annual'} className="waves-effect">Report Annual</Link></li>
                </ul>
            </li>
        );
    }
}

export default Report;