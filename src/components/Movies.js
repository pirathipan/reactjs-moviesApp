import React, { Component } from 'react';
import ReactModal from 'react-modal';
import Button from 'react-bootstrap/Button'

import './Style.css';

// style modal 
const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : '60%',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

class Movies extends Component {

    constructor(){
        super()

        this.state={
            showModal: false,
        }
        
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal () {
        this.setState({ showModal: true });
      }
      
      handleCloseModal () {
        this.setState({ showModal: true });
      }

    render() {
        let { title, release_date, poster, overview } = this.props.movie;
        return(
            <div>
                <div className="movie-card" onClick={this.handleOpenModal}>
                    <img src={poster} alt={this.props.movie.title} />
                    <h3 className="movie-card-title">{title}</h3>
                    <time className="movie-card-date">{release_date}</time>
                </div>
                <ReactModal style={customStyles} isOpen={this.state.showModal}  onHide={this.handleCloseModal}>
                    <Button onClick={this.handleCloseModal}>Close Modal</Button>
                    <h3 className="movie-card-title">{title}</h3>
                    <img className="movie-model-img"  src={poster} alt={this.props.movie.title} />
                    <text className="movie-model-desc" >{overview} </text>
                    <form>
                        <button>close</button>
                    </form>
                </ReactModal>
            </div>
        );
    }
}

Movies.defaultProps = {
    movie: {
        id: null,
        image: null,
        title: null,
        date: null,
        description: null
    }
}

export default Movies;