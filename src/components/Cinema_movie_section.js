import {useState} from 'react'
import {showtime_display, seat_display} from '../common_functions.js'
    export default function Cinema_movie_section({movie, showtime, selected_seats, unselect_all, commit_booking}) {
    const [movie_info] = useState(JSON.stringify(require('../data/movies.json').find(({id}) => id === movie)));
        return (
        <div className="cinema_movie_section">
            <img src={require('../data/' + movie + '.png')} className="movie_poster" draggable="false" alt=""></img>
            <p>{JSON.parse(movie_info).display_name}</p>
            <p>Сеанс на {showtime_display(showtime)}</p>
            {JSON.parse(selected_seats).length !== 0 && <>
                <div className="selected_seats">
                    <span className="unselect_all clickable" onClick={unselect_all}>
                        <img src={require('../icons/remove.png')} draggable="false" alt=""></img>
                    </span>
                    <p>Обрані місця: <span className="selected_seats_list">{JSON.parse(selected_seats).map((seat, index) => <><>{seat_display(seat[0], seat[1])}</>{index !== JSON.parse(selected_seats).length - 1 && <>, </>}</>)}</span></p>
                </div>
            </>}
        </div>
        );
    }