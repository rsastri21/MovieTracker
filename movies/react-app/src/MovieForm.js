import React, { Component } from 'react';
import './MovieForm.css';

var xhr;

class MovieForm extends Component {

    // Overrides Component constructor 
    constructor(props) {
        super(props);

        // Bind methods to current instance
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeGenre = this.handleChangeGenre.bind(this);
        this.changeState = this.changeState.bind(this);
        this.toGenreOption = this.toGenreOption.bind(this);
        this.tryCreateMovie = this.tryCreateMovie.bind(this);
        this.processRequest = this.processRequest.bind(this);

        this.state = { title: '', genre: 'comedy' };
    }
    
    tryCreateMovie() {
        xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost/movies");
        xhr.send(JSON.stringify({ "title": this.state.title, "genre": this.state.genre }));
        xhr.addEventListener("readystatechange", this.processRequest, false);
    }

    processRequest() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            this.props.eventDispatcher.dispatch("addMovie", "");
            this.changeState( { title: ""} );
        }
    }

    handleChangeTitle(event) {
        this.changeState( { title: event.target.value } );
    }

    handleChangeGenre(event) {
        this.changeState( { genre: event.target.value } );
    }

    changeState(keyVal) {
        this.setState( Object.assign({}, this.state, keyVal) );
    }

    toGenreOption(g) {
        return (<option key={g.value} value={g.value}>{g.label}</option>);
    }

    render() {
        return (
            <>
                <form className="movie-form" onSubmit={this.tryCreateMovie}>
                    <span className="movie-form-element">
                        <label>Title&nbsp;
                            <input type="text" value={this.state.title} onChange={this.handleChangeTitle} />
                        </label>
                    </span>
                    <span className="movie-form-element">
                        <label>Genre&nbsp;
                            <select type="text" value={this.state.genre} onChange={this.handleChangeGenre}>
                                {this.props.genres.map(this.toGenreOption)}
                            </select>
                        </label>
                    </span>
                    <span className="movie-form-element">
                        <input type="submit" value="Submit" />
                    </span>
                </form>
            </>
        )
    }

}

export default MovieForm;