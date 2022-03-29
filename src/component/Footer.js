import React from "react";

export default function Footer(props) {

    const { userName } = props;
    
    // style
    const footerStyle = { textAlign: 'center', padding: 4, }
    const footerTitleStyleNone = { color: '#fff' }
    const footerTitleStyle = { color: '#333333', fontSize: 16 };

    return (
        <div style={footerStyle} >
            <h2 style={userName ? footerTitleStyle : footerTitleStyleNone}>gitHub repository user / {userName}</h2>
        </div >
    );
}