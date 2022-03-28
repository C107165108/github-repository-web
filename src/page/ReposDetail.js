import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ReposDetail(props) {


    // path
    const { apiUrlUserName } = props;
    const urlPath = useParams();
    const apirepoName = urlPath.name;

    const [detailRepo, setDetailRepo] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        setIsLoading(true);
        axios
            .get(`https://api.github.com/repos/${apiUrlUserName}/${apirepoName}`)
            .then(response => {

                const targetRepo = response.data;
                setDetailRepo(targetRepo)
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error)
            })

    }, []);

    const { full_name, visibility, description, stargazers_count, html_url, language } = detailRepo;

    // style
    const loadingImgStyle = {
        width: 30,
    }
    const loadingStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItem: 'center',
        marginTop: 50,
    }

    const detailStyle = {
        width: '60%',
        padding: 32,
    }

    const titleContentStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItem: 'baseline',
        textDecoration: 'none',
        color: '#333333',
        flexWrap: 'wrap',
    }

    const titleStyle = {
        fontSize: 20,
        fontWeight: '600',
        marginRight: 16,
    }

    const visibilityStyle = {
        border: '#aaa 0.5px solid',
        borderRadius: 20,
        padding: '4px 12px',
        marginRight: 10,
    }
    const languageStyle = {
        borderRadius: 20,
        padding: '4px 12px',
        backgroundColor: '#b3ccff',
        color: '#003cb3',
        fontWeight: '600',
    }

    const anguageNone = {
    }

    const pStyle = {
        fontSize: 16,
        color: '#595959'
    }
    const ItemStarImgStyle = {
        width: 16,
        height: 16,
        marginRight: 5
    }

    const content = {
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        marginTop: 24,
        marginBottom: 24,
        padding: 16,
    }
    const contentnone = {
        marginTop: 24,
        marginBottom: 24,
    }

    const aStyle = {
        borderRadius: 20,
        padding: '8px 16px',
        backgroundColor: '#00b33c',
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
        width: 80,
        textAlign: 'center',
    }

    return (
        <>
            {isLoading ? (
                <div style={loadingStyle}> <img style={loadingImgStyle} src='https://cdn-icons-png.flaticon.com/512/6356/6356630.png' alt='loading' /></div>

            ) : (
                <div style={detailStyle}>

                    <div style={titleContentStyle}>

                        <div style={titleContentStyle}>
                            <h2 style={titleStyle}>{full_name}</h2>
                            <p style={visibility ? visibilityStyle : anguageNone}>{visibility}</p>
                            <p style={language ? languageStyle : anguageNone}> {language}</p>
                        </div>

                        <div style={titleContentStyle}>
                            <img src='https://cdn-icons-png.flaticon.com/512/2107/2107957.png' alt='star' style={ItemStarImgStyle} />
                            <p style={pStyle}> {stargazers_count}</p>
                        </div>

                    </div>

                    <div style={description ? content : contentnone}>
                        <p style={pStyle}>{description}</p>
                    </div>

                    <a href={html_url} style={aStyle}>查看</a>


                </div >
            )}
        </>
    );
}