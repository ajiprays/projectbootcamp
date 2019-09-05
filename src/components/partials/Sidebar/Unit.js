import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Unit extends Component {
    render(){
        return(
            <li>
                <Link to={'/unit'} className="waves-effect"><i className="icon-people"></i> <span> Unit </span></Link>
            </li>
        );
    }
}

export default Unit;