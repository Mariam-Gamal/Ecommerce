import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
// import { Offline, Online } from "react-detect-offline";


export default function Layout() {
    
    return <>
    <Navbar/>
    <div className="container my-5 py-5">
    <Outlet></Outlet>
    </div>
{/* <div>
<Offline>
        <div className="network">
            <i className="fas fa-wifi"></i> you are offline now (surprise!)</div>
            </Offline>
</div> */}
    

    </>
}

