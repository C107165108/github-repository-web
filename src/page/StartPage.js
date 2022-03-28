import React from "react";
import { Link } from 'react-router-dom';



export default function StartPage(props) {

    const userName = props;

    // style
    const homeStyle = { width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', }
    const windowHeight = window.innerHeight;
    const btnStyle = {
        borderRadius: 20,
        padding: '8px 16px',
        backgroundColor: '#00b33c',
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
        textAlign: 'center',
        marginTop: windowHeight / 5,
    }

    return (
        <div style={homeStyle}>

            <Link to={`users/${userName.userName}/repos`}>
                <button style={btnStyle}>
                    Click To Start
                </button>
            </Link>

        </div>
    );
}