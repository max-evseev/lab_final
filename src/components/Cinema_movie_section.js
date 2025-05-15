import {useState} from 'react'
import {showtime_display, seat_list_display} from '../services/display_functions.js'
    export default function Cinema_movie_section({show_info, booking_list, change_selected}) {
    const [movie_info] = useState(JSON.stringify(require('../data/movies.json').find(({id}) => id === show_info.movie)));
        function clear_selected() {
        localStorage.removeItem(show_info.showtime);
        change_selected();
        }
        return (
        <div className="cinema_movie_section">
            <img src={require('../data/' + JSON.parse(movie_info).id + '.png')} className="movie_poster" draggable="false" alt=""></img>
            <p>{JSON.parse(movie_info).display_name}</p>
            <p>Сеанс на {showtime_display(show_info.showtime)}</p>
            {JSON.parse(booking_list).findIndex(item => item.showtime === show_info.showtime) !== -1 && <>
                <div className="selected_seats">
                    <span className="unselect_all clickable" onClick={() => clear_selected()}>
                        <img src={require('../icons/remove.png')} draggable="false" alt=""></img>
                    </span>
                    <p>Обрані місця: <span className="selected_seats_list">{seat_list_display(JSON.parse(booking_list)[JSON.parse(booking_list).findIndex(item => item.showtime === show_info.showtime)].seats)}</span></p>
                </div>
            </>}
        </div>
        );
    }