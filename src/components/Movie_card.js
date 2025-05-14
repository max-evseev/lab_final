import {runtime_display, genre_list_display, showtime_display} from '../services/display_functions.js'
import {useState} from 'react';
    export default function Movie_card({ movie_info }) {
    const [highlight_status, set_highlight] = useState('');
        return (
        <div className={"movie_card " + highlight_status} onMouseOver={() => set_highlight('active')} onMouseOut={() => set_highlight('inactive')}>
            <img className="movie_poster" src={require('../data/' + movie_info.id + '.png')} alt="" draggable="false"></img>
            <div className="movie_side_info">
                <p className="movie_title">{movie_info.display_name}</p>
                <p className="movie_subtitle">{genre_list_display(movie_info.genres)}</p>
                <p className="movie_subtitle">{runtime_display(movie_info.runtime)} • {String(movie_info.age_restriction)}+</p>
                <div className="schedule_section">
                    {movie_info.show_schedule.map((showtime) => <a className="movie_showtime" href={"/booking/" + showtime}>{showtime_display(showtime)}</a>)}
                </div>
                <p className="movie_price">{String(movie_info.price.toFixed(2)) + ' ГРН.'}</p>
            </div>
        </div>
        );
    }