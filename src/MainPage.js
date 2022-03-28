import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import axios from 'axios';

import StartPage from "./page/StartPage";
import ReposList from "./page/ReposList";
import ReposDetail from "./page/ReposDetail";
import Header from "./page/Header";
import Footer from "./page/Footer";

export default function MainPage() {

    const apiUrlUserName = 'jesseduffield';

    const [repos, setRepos] = useState([]);
    const [userName, setUserName] = useState([]);
    const [perpage, setPerPage] = useState(10);
    const [reposLength, setReposLength] = useState([]);

    const getDataLength = () => {
        axios
            .get(`https://api.github.com/users/${apiUrlUserName}`, {
                headers: { 'Accept': 'application/vnd.github.v3+json' }
            })
            .then(response => {
                const targetReposLength = response.data.public_repos;
                setReposLength(targetReposLength)
                console.log(targetReposLength)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const fetchData = () => {
        axios
            .get(`https://api.github.com/users/${apiUrlUserName}/repos?per_page=${perpage}`, {
                headers: { 'Accept': 'application/vnd.github.v3+json' }
            })
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
        const moreTendata = perpage + 10;
        const limitreposLength = reposLength + 10;

        if (moreTendata < limitreposLength + 10) {
            setTimeout(() => {
                setPerPage(moreTendata);
            }, 1500);

            fetchData();
        } else {
            console.log('nomoredata')
        }
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
                        <Route path='/' element={<StartPage userName={userName} />} />
                        <Route path={homePath} element={<ReposList repos={repos} userName={userName} fetchMoreData={fetchMoreData} perpage={perpage} reposLength={reposLength} />} />
                        <Route path={detailPath} element={<ReposDetail repos={repos} apiUrlUserName={apiUrlUserName} />} />
                    </Routes>
                </Router>
            </div>

            <Footer userName={userName} />

        </div>
    );
}