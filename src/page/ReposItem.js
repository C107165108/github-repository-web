import React from "react";


export default function ReposItem(props) {

    const { repo } = props;

    // style
    const ItemContentStyle = {
        border: '#bfbfbf 0.5px solid',
        borderRadius: 10,
        padding: 32,
        margin: 16,
        display: 'flex',
        justifyContent: 'space-between',
        alignItem: 'baseline',
        width: 700,
       
    }
    const ItemtitleStyle = {
        fontSize: 18,
        fontWeight: '600',
    }
    const ItemStarContentStyle = {
        display: 'flex',
        alignItem: 'center',
    }
    const ItemStarImgStyle = {
        width: 16,
        height: 16,
        marginRight: 5
    }
    const ItemStarStyle = {
        fontSize: 16,
    }


    return (
        <div style={ItemContentStyle}>

            <h4 style={ItemtitleStyle}>{repo.name}</h4>
            <div style={ItemStarContentStyle}>
                <img src='https://cdn-icons-png.flaticon.com/512/2107/2107957.png' alt='star' style={ItemStarImgStyle} />
                <p style={ItemStarStyle}> {repo.stargazers_count}</p>
            </div>
        </div>
    );
}