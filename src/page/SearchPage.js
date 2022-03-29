import React from "react";
import { useNavigate } from 'react-router-dom';

export default function SearchPage(props) {

    const { setApiUserName, homePath, fetchData, getDataLength } = props;
    let navigate = useNavigate();

    // style
    const windowHeight = window.innerHeight;
    const homeStyle = { width: '100%', marginTop: windowHeight / 3, textAlign: 'center' };
    const contentStyle = { width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' };
    const TitleStyle = { fontWeight: '600', fontSize: 24, marginBottom: 30 };
    const InputStyle = { width: 360, padding: '16px 32px', border: '#808080 1px solid', borderRadius: 30, marginRight: 10 };
    const btnStyle = { borderRadius: 30, padding: '12px 16px', backgroundColor: '#00b33c', color: '#fff', fontWeight: '600', fontSize: 16, width: 80, textAlign: 'center' };


    const handleChange = (event) => {
        setApiUserName(event.target.value);
    }

    const onSubmit = () => {
        navigate(homePath);
        fetchData();
        getDataLength();
    }

    return (
        <div style={homeStyle}>

            <h3 style={TitleStyle}>GitHub Repository Web</h3>

            <div style={contentStyle}>
                <input style={InputStyle} onChange={handleChange} type="text" placeholder="username" />
                <button onClick={onSubmit} style={btnStyle}>送出</button>
            </div>

        </div>
    );
}