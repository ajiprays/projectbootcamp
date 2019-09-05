import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Annual extends Component {
    render(){
        const {isAdmin, isSuperAdmin} = this.props;
        return(
            <li className="has_sub treeview"> 
                <a href="#" className="waves-effect "><i className="ti-agenda"></i> <span> Annual </span> <span className="menu-arrow"></span></a>
                <ul className="list-unstyled treeview-menu">
                    <li>
                        <Link  to="/annual/form" className="waves-effect">Annual Form</Link>
                    </li>
                    { isAdmin || isSuperAdmin &&
                    <>
                        <li>
                            <Link to="/annual/list" className="waves-effect">Annual List</Link>
                        </li>
                        <li>
                            <Link to="/annual/request" className="waves-effect">Annual Request</Link>
                        </li>
                        <li>
                            <Link to="/annual/leave" className="waves-effect">Annual Leave</Link>
                        </li>
                    </>
                    }
                </ul>
            </li>
        );
    }
}

export default Annual;