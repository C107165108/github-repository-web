import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import axios from 'axios';

import HomePage from "./page/HomePage";
import ReposDetail from "./page/ReposDetail";
import Header from "./page/Header";
import Footer from "./page/Footer";

export default function MainPage() {

    const [repos, setRepos] = useState([]);
    const [userName, setUserName] = useState([]);
    const [perpage, setPerPage] = useState(10);
    const [reposLength, setReposLength] = useState([]);

    const apiUrlUserName = 'aakashjhawar'

    const getDataLength = () => {
        axios
            .get(`https://api.github.com/users/${apiUrlUserName}`)
            .then(response => {
                const targetReposLength = response.data.public_repos;
                setReposLength(targetReposLength)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const fetchData = () => {
        axios
            .get(`https://api.github.com/users/${apiUrlUserName}/repos?per_page=${perpage}`)
            .then(response => {

                const targetRepos = response.data;
                setRepos(targetRepos);

                const targetUserName = response.data[0].owner.login;
                setUserName(targetUserName);

            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        fetchData();
        getDataLength();
    }, []);

    const fetchMoreData = () => {
        const moredata = perpage + 10

        setTimeout(() => {
            setPerPage(moredata);
        }, 1500);

        fetchData();
    };

    // path
    const homePath = `users/${userName}/repos`;
    const detailPath = `users/${userName}/repos/:name`;

    // style
    const windowHeight = window.innerHeight;
    const bodyStyle = { width: '100%', height: windowHeight - 75, display: 'flex', alignItems: 'center', flexDirection: 'column' };

    return (
        <div>

            <Header userName={userName} homePath={homePath} />

            <div style={bodyStyle}>
                <Router>
                    <Routes>
                        <Route path='/' element={<GoTo />} />
                        <Route path={homePath} element={<HomePage repos={repos} userName={userName} fetchMoreData={fetchMoreData} perpage={perpage} reposLength={reposLength} />} />
                        <Route path={detailPath} element={<ReposDetail repos={repos} apiUrlUserName={apiUrlUserName} />} />
                    </Routes>
                </Router>
            </div>

            <Footer userName={userName} />

        </div>
    );
}