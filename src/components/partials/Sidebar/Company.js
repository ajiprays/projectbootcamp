import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Company extends Component {
    render(){
        return(
            <li>
                <a href={'/company'} className="waves-effect"><i className="md-location-city"></i> <span> Company </span></a>
            </li>
        );
    }
}

export default Company;