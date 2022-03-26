import React from "react";

export default function Footer(props) {

    const { userName } = props;
    
    const headerStyle = {
        textAlign: 'center',
        padding: 4,
    }
    const headerTitleStyle = {
        color: '#333333', fontSize: 16,
    };

    return (
        <div style={headerStyle} >
            <h2 style={headerTitleStyle}>@{userName}</h2>
        </div >
    );
}