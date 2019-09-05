import React, { Component } from 'react';

class Attendee extends Component {
    render(){
        const {isSuperAdmin} = this.props;
        return(
            <li>
                <a href={'/attendee'} className="waves-effect"><i className="md-location-city"></i> <span> Attendee </span> <span className="menu-arrow"></span></a>
                <ul className="list-unstyled treeview-menu">
                    <li><a href={'/attendee/absen'} className="waves-effect">Absen</a></li>
                    { isSuperAdmin &&
                        <li><a href={'/attendee/register'} className="waves-effect">Register</a></li>
                    }
                </ul>
            </li>
        );
    }
}

export default Attendee;