import React, { useState } from "react";
import { Link } from 'react-router-dom';



export default function HomePage(props) {

    const userName = props;



    const homeStyle = { width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }



    return (
        <div style={homeStyle}>
            <Link to={`users/${userName.userName}/repos`}>click</Link>
        </div>
    );
}