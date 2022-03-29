import React from "react";
import { Link } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";

import ReposItem from "../component/ReposItem";

export default function ReposList(props) {

    const { repos, fetchMoreData, perpage, reposLength } = props;

    // style
    const windowHeight = window.innerHeight;
    const listStyle = { width: '100%', height: windowHeight - 100, overflow: "auto", display: 'flex', alignItems: 'center', flexDirection: 'column' };
    const ItemStyle = { textDecoration: 'none', color: '#333333' };
    const loadingImgStyle = { width: 20 };
    const loadingStyle = { display: 'flex', justifyContent: 'center' };

    return (
        <div style={listStyle} id="scrollableDiv">
            <InfiniteScroll
                dataLength={perpage}
                next={fetchMoreData}
                hasMore={true}
                loader={perpage < reposLength
                    ? <div style={loadingStyle}> <img style={loadingImgStyle} src='https://cdn-icons-png.flaticon.com/512/6356/6356630.png' alt='loading' /></div>
                    : ''}
                scrollableTarget="scrollableDiv">

                {repos.map((repo) =>
                    <Link
                        key={repo.id}
                        to={`${repo.name}`}
                        style={ItemStyle}>
                        <ReposItem key={repo.id} repo={repo} />
                    </Link>
                )}

            </InfiniteScroll>
        </div >
    );
}