import React, { Component } from "react";
import './App.css';
import MovieList from "./MovieList";
import MovieForm from "./MovieForm";

const genres = [
    {value: 'action', label: 'Action'},
    {value: 'comedy', label: 'Comedy'},
    {value: 'drama', label: 'Drama'},
    {value: 'thriller', label: 'Thriller'},
    {value: 'musical', label: 'Musical'}
]

/*
const movies = [
    {genre: 'action', title: 'Captain Marvel', guid: '6530b64b-0753-4629-a1bb-6716109b964b'},
    {genre: 'comedy', title: 'Groundhog Day', guid: 'ba5b9881-7128-485f-84d5-afc50f199b23'},
    {genre: 'action', title: 'Midway', guid: '2e93da48-d451-4df0-b77c-41dddde428ad'},
    {genre: 'drama', title: 'Dances with Wolves', guid: 'f207c1a0-3bef-48f1-a596-29b84887ed94d'},
    {genre: 'thriller', title: 'Scream', guid: '3733f942-6a44-4eb9-af54-586d9d15eb67'}
]
*/

const eventDispatcher = {
    listeners: {},
    dispatch: function(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(function(l) {
                l(data);
            });
        }
    },
    subscribe: function(event, f) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(f);
    }
}

class App extends Component {

    render() {
        return (
            <div className="App">
                <h1>
                    Movies
                </h1>
                <div>
                    <MovieForm genres={genres} eventDispatcher={eventDispatcher} />
                </div>
                <div>
                    <MovieList genres={genres} eventDispatcher={eventDispatcher} />
                </div>
            </div>
        )
    }
}

export default App;