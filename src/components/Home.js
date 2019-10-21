import React, { Component } from 'react';

import MovieCard from './Movies';
import Pagination from './Pagination';
import { isUndefined } from 'util';

import './Style.css';

class Home extends Component {

    API_KEY = '498bd3685614ef730117cc059d8d80e1';
    baseURL = 'https://api.themoviedb.org/3/';
    baseImageURL = 'https://image.tmdb.org/t/p/';

    state = {
        currentPage: 1,
        lastPage: 1,
        searchQuery: '',
        moviesList : [],
    }

    getCurrentPage = () => {
        if(isUndefined(this.props.match.params.page)) {
            return 1;
        } else {
            return +this.props.match.params.page
        }
    }

    getConfig = () => {
        let url = "".concat(this.baseURL, 'configuration?api_key=', this.API_KEY); 
        fetch(url)
        .then((result)=>{
            return result.json();
        })
        .then((data)=>{
            this.baseImageURL = data.images.secure_base_url;
        })
    }

    setMoviesList = (query, page) => {
        var url;
        if (query === '') {
            url = ''.concat(this.baseURL, 'movie/popular?api_key=', this.API_KEY, '&page=', page);
        } else {
            url = ''.concat(this.baseURL, 'search/movie?api_key=', this.API_KEY, '&query=', query, '&page=', page);
        }
        fetch(url)
        .then(result=>result.json())
        .then((data)=>{
            this.setState({
                ...this.state,
                moviesList: data.results,
                currentPage: page, 
                lastPage: data.total_pages,
            });
        })
        
    }

    getMoviesList = () => {
        let moviesList = this.state.moviesList;
        if (moviesList.length > 0) {
            return moviesList.map((movie) => {
                movie.poster = this.baseImageURL + 'w300' + movie.poster_path;
                return <MovieCard movie={movie} key={movie.id} />
            });
        } 
    }

    componentDidMount() {
        this.getConfig();
        this.setMoviesList(this.state.searchQuery, this.getCurrentPage());
    }

    componentDidUpdate() {
        if (this.state.currentPage !== this.getCurrentPage()) {
            window.scrollTo(0, 0);
            this.setMoviesList(this.state.searchQuery, this.getCurrentPage());
        }
    }

    render() {
        return(
            <div className="home">
                <header className="header" rootPage={this.state.currentPage === 1 ? true : false} >
                    <h1 className="header-logo">Movie App</h1>
                </header>
                <div className="home-movies-container">
                    {this.getMoviesList()}
                </div>
                <Pagination currentPage={this.getCurrentPage()} lastPage={this.state.lastPage} />
            </div>
        );
    }
}

export default Home;