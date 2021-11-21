import React, { Component } from 'react'

export class Newsitem extends Component {
    render() {
        let {title , desc , imageUrl, url} = this.props;
        return (
            <div className="my-3">
                <div className="card" >
                <img src={imageUrl}/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{desc}</p>
                    <a rel="noreferrer" href={url} target="_blank" className="btn btn-sm btn-primary">Read more</a>
                </div>
                </div>
                
            </div>
        )
    }
}

export default Newsitem
