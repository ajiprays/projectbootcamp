import React from 'react';
import Navbar from './Navbar';
import Notifications from './Notifications';
import Profile from './Profile';
import SideBar from './../Sidebar/Sidebar';

export default function Header(){
    return(
        <div className="topbar">
            <div className="topbar-left">
                <div className="text-center">
                    <a href="#" className="logo">
                        <i className="icon-magnet icon-c-logo"></i><span>Attendee</span>
                    </a>
                </div>
            </div>
            <div  className="navbar navbar-default" role="navigation">
                <div  className="container">
                    <div className="">
                        <Navbar/>
                            <ul className="nav navbar-nav navbar-right pull-right">
                                <Notifications />
                                <Profile />
                            </ul> 
                        </div>
                    </div>
            </div>
        </div>
    );
}