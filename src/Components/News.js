import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {

    static defaultProps = {
        country : "${this.props.country}",
        pageSize : 8,
        category : 'genral'
    }

    constructor(){
        super();
        console.log("Hello i am a constructor from news component");
        this.state = {
            articles :  [],
            loading :  false,
            page : 1
        }
    }
    async componentDidMount(){
        console.log("Cdm")
        let url = `http://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b947f06ca11c4de7a892a8ec192c35d3&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading : true})
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles : parsedData.articles, 
            totalResuts : parsedData.totalResuts,
            loading : false}
        );
    }
    prevClick = async ()=> {
        
        let url = `http://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b947f06ca11c4de7a892a8ec192c35d3&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading : true})
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            page : this.state.page - 1,
            articles : parsedData.articles,
            loading : false
        })
    }

    nextCick = async ()=> {
        if(this.state.page > Math.ceil(this.state.totalResuts/20))
        {
            
        }  
        else{
            let url = `http://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b947f06ca11c4de7a892a8ec192c35d3&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading : true})
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);
            this.setState({
                page : this.state.page + 1,
                articles : parsedData.articles,
                loading : false
            })
        }
    }
    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center">NewsBoard - Top Headlines</h1>
                {this.state.loading && <Spinner/>}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element)=>{
                        return  <div className="col-md-4 " key ={element.url} >
                        <Newsitem  title={element.title} desc={element.description} imageUrl={element.urlToImage}
                        url={element.url} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1}  type="button" className="btn btn-success" onClick={this.prevClick} >&larr;  prev</button>
                    <button disabled={this.state.page > Math.ceil(this.state.totalResuts/20)} type="button" className="btn btn-success" onClick={this.nextCick}>next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News;
