import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Employee extends Component {
    render(){
        return(
            <li className="has_sub treeview">
                <a href="#" className="waves-effect"><i className="ti-user"></i> <span> Employee</span> <span className="menu-arrow"></span></a>
                <ul className="list-unstyled treeview-menu">
                    <li><Link to={'/employee'} className="waves-effect">List Employee</Link></li>
                    <li><Link to={'/employee/form'} className="waves-effect">Add Employee</Link></li>
                </ul>
            </li>
        );
    }
}

export default Employee;