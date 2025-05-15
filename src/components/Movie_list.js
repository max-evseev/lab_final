import Movie_card from './Movie_card'
    export default function Movie_list({movies}) {
        return (
        movies.map((movie_info) => <Movie_card movie_info={movie_info}></Movie_card>)
        );
    }