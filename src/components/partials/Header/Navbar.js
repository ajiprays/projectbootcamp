import React from 'react';

export default function Navbar(){
    return(
        <>
            <div className="pull-left">
                <button className="button-menu-mobile open-left waves-effect waves-light">
                    <i className="md md-menu"></i>
                </button>
                <span className="clearfix"></span>
            </div>
        </>
    );
}