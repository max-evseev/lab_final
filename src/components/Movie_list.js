import Movie_card from './Movie_card'
import { useEffect, useState } from 'react';
var all_movies = require('../data/movies.json');
    export default function Movie_list() {
    const [movies_list, set_movies_list] = useState(all_movies);
        return (
        movies_list.map((movie_info) => <Movie_card movie_info={movie_info}></Movie_card>)
        );
    }