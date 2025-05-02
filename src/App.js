import Movie_list from './components/Movie_list'
import { useState } from "react";
var all_movies = require('./data/movies.json');
    export default function App() {
    const [movie_list, set_list] = useState(all_movies);
        return (
        <div className="main_content">
            {movie_list.length === 0 && <p>По вашому запиту нічого не знайдено</p>}
            {movie_list.length !== 0 && <Movie_list movies={movie_list}></Movie_list>}    
        </div>
        );
    }