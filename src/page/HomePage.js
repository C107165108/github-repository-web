import React from "react";
import ReposList from "./ReposList";


export default function HomePage(props) {

    const { repos, fetchMoreData, perpage, reposLength } = props;

    const homeStyle = { width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }

    return (
        <div style={homeStyle}>

            <ReposList repos={repos} fetchMoreData={fetchMoreData} perpage={perpage} reposLength={reposLength} />

        </div>
    );
}