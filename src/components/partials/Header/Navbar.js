import React from 'react';
import Notifications from './Notifications';

export default function Navbar(){
    return(
        <div>
            <div id="page-wrap" className="pull-left">
                <button className="button-menu-mobile open-left waves-effect waves-light">
                    <i className="md md-menu"></i>
                </button>
                <span className="clearfix"></span>
            </div>

            <ul className="nav navbar-nav hidden-xs">
                <li className="dropdown">
                    <a href="#" className="dropdown-toggle waves-effect waves-light" data-toggle="dropdown"
                        role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span
                        className="caret"></span></a>
                    <ul className="dropdown-menu">
                        <li><a href="#">Action</a></li>
                        <li><a href="#">Another action</a></li>
                        <li><a href="#">Something else here</a></li>
                        <li><a href="#">Separated link</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}