import Movie_list from '../components/Movie_list'
import Movie_search from '../components/Movie_search'
import {useState} from "react";
const all_movies = require('../data/movies.json');
    export default function Home() {
    const [movie_list, set_list] = useState(all_movies);
        return (
        <>
            <Movie_search set_list={set_list}></Movie_search>
            <div className="home_main_content">
                {movie_list.length === 0 && <p className="not_found">по вашому запиту нічого не знайдено</p>}
                {movie_list.length !== 0 && <Movie_list movies={movie_list}></Movie_list>}
            </div>
        </>
        );
    }