import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Annual extends Component {
    render(){
        const {isAdmin, isSuperAdmin} = this.props;
        return(
            <li>
                <a href="#" className="waves-effect "><i className="ti-agenda"></i> <span> Annual </span> <span className="menu-arrow"></span></a>
                <ul className="list-unstyled treeview-menu">
                    <li>
                        <a href={"/annual/form"}  className="waves-effect">Annual Form</a>
                    </li>
                    { isAdmin || isSuperAdmin &&
                    <>
                        <li>
                            <a href={"/annual/list"} className="waves-effect">Annual List</a>
                        </li>
                        <li>
                            <a href={"/annual/request"} className="waves-effect">Annual Request</a>
                        </li>
                    </>
                    }
                </ul>
            </li>
        );
    }
}

export default Annual;