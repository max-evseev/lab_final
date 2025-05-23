﻿import Movie_list from '../components/Movie_list'
import Movie_search from '../components/Movie_search'
import {useState} from 'react';
const all_movies = require('../data/movies.json');
    export default function Home() {
    const [movie_list, set_list] = useState(JSON.stringify(all_movies));
        return (
        <>
            <Movie_search set_list={set_list}></Movie_search>
            <div className="home_main_content">
                {JSON.parse(movie_list).length === 0 && <p className="text_message">По вашому запиту нічого не знайдено</p>}
                {JSON.parse(movie_list).length !== 0 && <Movie_list movies={JSON.parse(movie_list)}></Movie_list>}
            </div>
        </>
        );
    }