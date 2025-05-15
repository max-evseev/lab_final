import {runtime_display, genre_list_display, showtime_display, price_display} from '../services/display_functions.js'
    export default function Movie_card({movie_info}) {
        return (
        <div className="movie_card">
            <img className="movie_poster" key={movie_info.id} src={require('../data/' + movie_info.id + '.png')} alt="" draggable="false"></img>
            <div className="movie_side_info">
                <p className="movie_title">{movie_info.display_name}</p>
                <p className="movie_subtitle">{genre_list_display(movie_info.genres)}</p>
                <p className="movie_subtitle">{runtime_display(movie_info.runtime)} • {String(movie_info.age_restriction)}+</p>
                <div className="schedule_section">
                    {movie_info.show_schedule.map((showtime) => <a className="movie_showtime" href={"/booking/" + showtime}>{showtime_display(showtime)}</a>)}
                </div>
                <p className="movie_price">{price_display(movie_info.price)}</p>
            </div>
        </div>
        );
    }