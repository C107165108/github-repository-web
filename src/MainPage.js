import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import axios from 'axios';

import SearchPage from "./page/SearchPage";
import ReposList from "./page/ReposList";
import ReposDetail from "./page/ReposDetail";
import Header from "./component/Header";
import Footer from "./component/Footer";

export default function MainPage() {

    const [apiUserName, setApiUserName] = useState('')
    const [repos, setRepos] = useState([]);
    const [userName, setUserName] = useState('');
    const [perpage, setPerPage] = useState(10);
    const [reposLength, setReposLength] = useState([]);

    const getDataLength = () => {
        axios
            .get(`https://api.github.com/users/${apiUserName}/repos`, {
                headers: { 'Accept': 'application/vnd.github.v3+json' }
            })
            .then(response => {
                const targetReposLength = response.data.length;
                setReposLength(targetReposLength)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const fetchData = () => {
        axios
            .get(`https://api.github.com/users/${apiUserName}/repos?per_page=${perpage}`, {
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
    const homePath = `users/${apiUserName}/repos`;
    const detailPath = `users/${apiUserName}/repos/:name`;

    // style
    const windowHeight = window.innerHeight;
    const bodyStyle = { width: '100%', height: windowHeight -75, display: 'flex', alignItems: 'center', flexDirection: 'column' };

    return (
        <div>

            <Header userName={userName} homePath={homePath} />

            <div style={bodyStyle}>
                <Router>
                    <Routes>
                        <Route path='/' element={<SearchPage setApiUserName={setApiUserName} homePath={homePath} fetchData={fetchData} getDataLength={getDataLength} />} />
                        <Route path={homePath} element={<ReposList repos={repos} userName={userName} fetchMoreData={fetchMoreData} perpage={perpage} reposLength={reposLength} />} />
                        <Route path={detailPath} element={<ReposDetail repos={repos} apiUserName={apiUserName} userName={userName}/>} />
                    </Routes>
                </Router>
            </div>

            <Footer userName={userName} />

        </div>
    );
}