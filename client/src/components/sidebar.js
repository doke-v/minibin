import React from "react";


function Sidebar(props) {

    return (

        <div className="sidebar">
            <div class="container">
                <div class="bar1"></div>
                <div class="bar2"></div>
                <div class="bar3"></div>
            </div>
            <div className="sidebar-items">
                {props.children}
            </div>
        </div>
    );
}

export default Sidebar;
