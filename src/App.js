import Movie_list from './components/Movie_list'
import { useState, useEffect } from "react";
var all_movies = require('./data/movies.json');
    export default function App() {
    const [movie_list, set_list] = useState(all_movies);
    const [search_query, set_query] = useState('');
        useEffect(() => {
        let query_result = [];
            all_movies.forEach((movie) => {
                if (movie.display_name.toLowerCase().search(search_query.toLowerCase().trim()) === 0) {
                query_result.push(movie);
                }
            });
        set_list(query_result);
        }, [search_query]);
        return (
        <>
            <div className="search_section">
                <div className="search_input">
                    <img className="input_icon" src={require('./icons/search.png')} draggable="false" alt=""></img>
                    <input className="search_input" placeholder="Шукайте фільми..." value={search_query} onChange={e => set_query(e.target.value)}></input>
                </div>
            </div>
            <div className="main_content">
                {movie_list.length === 0 && <p>По вашому запиту нічого не знайдено</p>}
                {movie_list.length !== 0 && <Movie_list movies={movie_list}></Movie_list>}    
            </div>
        </>
        );
    }