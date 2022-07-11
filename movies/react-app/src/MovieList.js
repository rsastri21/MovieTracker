import React, { Component } from "react";
import './MovieList.css';

var xhr;

class MovieList extends Component {

    constructor(props) {
        super(props);
        this.toMovie = this.toMovie.bind(this);
        this.genreLabel = this.genreLabel.bind(this);
        this.state = {
            movies: []
        }
        this.sendRequest = this.sendRequest.bind(this);
        this.processRequest = this.processRequest.bind(this);
        this.props.eventDispatcher.subscribe("addMovie", this.sendRequest);
    }

    sendRequest() {
        xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost/movies");
        xhr.send();
        xhr.addEventListener("readystatechange", this.processRequest, false);
    }

    processRequest() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            this.setState({
                movies: response
            });
        }
    }

    componentDidMount() {
        this.sendRequest();
    }

    genreLabel(g) {
        return "?";
    }

    toMovie(m) {
        var g = "?";
        for (var i = 0; i < this.props.genres.length; i++) {
            if (this.props.genres[i].value === m.genre) {
                g = this.props.genres[i].label;
                break;
            }
        }
        return (<tbody key={m.guid}><tr><td>{m.title}</td><td>{g}</td></tr></tbody>);
    }

    render() {
        return (
            <table className="movie-list" >
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Genre</th>
                    </tr>
                </tbody>
                {this.state.movies.map(this.toMovie)}
            </table>
        )
    }
}

export default MovieList;