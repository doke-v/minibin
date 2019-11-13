import React from "react";
import { useStoreState } from "easy-peasy";

function Sidebar(props) {
    const canDelete = useStoreState(state => state.paste.canDelete);
    return (

        <div className="sidebar">
            <div className="container">
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>
            <div className="sidebar-items">
                {canDelete?"Delete":""}
                {props.children}
            </div>
        </div>
    );
}

export default Sidebar;
