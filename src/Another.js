import React from 'react';

export default class Another extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            datas: [],
        };
    }

    componentDidMount() {
        fetch(
            "https://api.github.com/users/jesseduffield/repos")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    datas: json,
                });
            })
    }
    render() {
        const { datas } = this.state;
        return (
            <div>
           
              
                {datas.map(data => <div>{data.id}</div>)} 
            </div>
        );
    }
}