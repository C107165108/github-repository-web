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
    const [page, setPage] = useState(1);
    const [reposLength, setReposLength] = useState([]);

    const getDataLength = () => {
        axios
            .get(`https://api.github.com/users/${apiUserName}`, {
                headers: { 'Accept': 'application/vnd.github.v3+json' }
            })
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
            .get(`https://api.github.com/users/${apiUserName}/repos?per_page=${perpage}&page=${page}`, {
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


    const getMoreData = () => {

        // peerpage
        const moreTendata = perpage + 10;

        // limitReposLength
        const limitreposLength = reposLength + 10;
        const newlimiten = parseInt((limitreposLength % 100) / 10)
        const newlimitone = parseInt((limitreposLength % 100) / 10)
        const newlimitLength = newlimiten * 10 + newlimitone
        // limitPageLength
        const limitPage = reposLength / 100

        if (reposLength <= 100) {

            if (moreTendata < limitreposLength + 10) {
                setTimeout(() => {
                    setPerPage(moreTendata);
                }, 1500);
                fetchData();
            } else {
                console.log('no more data')
            }

        } else {
            if (reposLength > 100, page <= limitPage) {
                if (moreTendata <= newlimitLength + 10) {
                    setTimeout(() => {
                        setPerPage(moreTendata);
                    }, 1500);
                    fetchData();
                } else {
                    const perpage = 0
                    console.log('perpage', perpage + 10, 'page', page + 1)
                    setTimeout(() => {
                        setPerPage(perpage + 10);
                        setPage(page + 1);
                    }, 1500);
                }
            } else {
                console.log('no more data')
            }
        }
    };


    // path
    const homePath = `users/${apiUserName}/repos`;
    const detailPath = `users/${apiUserName}/repos/:name`;

    // style
    const windowHeight = window.innerHeight;
    const bodyStyle = { width: '100%', height: windowHeight - 75, display: 'flex', alignItems: 'center', flexDirection: 'column' };

    return (
        <div>

            <Header userName={userName} homePath={homePath} />

            <div style={bodyStyle}>
                <Router>
                    <Routes>
                        <Route path='/' element={<SearchPage setApiUserName={setApiUserName} homePath={homePath} fetchData={fetchData} getDataLength={getDataLength} />} />
                        <Route path={homePath} element={<ReposList repos={repos} userName={userName} getMoreData={getMoreData} perpage={perpage} reposLength={reposLength} />} />
                        <Route path={detailPath} element={<ReposDetail repos={repos} apiUserName={apiUserName} userName={userName} />} />
                    </Routes>
                </Router>
            </div>

            <Footer userName={userName} />

        </div>
    );
}