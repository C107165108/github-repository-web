import React from "react";

export default function Header(props) {

    const { userName } = props;

    // style
    const headerStyle = { textAlign: 'center', padding: 16, boxShadow: '0px 0px 5px 0px #cccccc' }
    const headerStylenone = { boxShadow: 'none' }
    const headerTitleStyle = { color: '#333333', fontSize: 18, fontWeight: '600' };

    return (
        <div style={userName ? headerStyle : headerStylenone} >
            <h2 style={headerTitleStyle}>{userName}</h2>
        </div >
    );
}