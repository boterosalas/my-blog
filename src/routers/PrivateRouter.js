import React from 'react';
import { Outlet } from "react-router-dom";



import Navbar from '../components/ui/Navbar';


export const PrivateRouter = () => {

    return (
        <>
            <Navbar />
            <div className="container-md mt-5">
                <Outlet />
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </>
    )
}

export default PrivateRouter