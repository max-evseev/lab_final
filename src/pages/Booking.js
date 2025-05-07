import Cinema_hall from '../components/Cinema_hall'
import {useParams} from 'react-router-dom'
import {useState} from 'react'
import {showtime_display, seat_display} from '../common_functions.js'
    export default function Booking() {
    const params = useParams();
    const [show_info, set_show_info] = useState(JSON.stringify(require('../data/show_schedule.json').find(({showtime}) => showtime === params.showtime)));
    const [movie_info, set_movie_info] = useState(JSON.stringify(require('../data/movies.json').find(({id}) => id === JSON.parse(show_info).movie)));
    const [selected_seats, set_selected_seats] = useState(JSON.stringify([]));
        function change_selected_seats(new_array) {
        set_selected_seats(new_array);
        }
        return (
        <div className="booking_main_content">
            <Cinema_hall seats={JSON.parse(show_info).seats} selected_seats_array={selected_seats} change_selected={change_selected_seats}></Cinema_hall>
            <div className="cinema_side_content">
                <img src={require('../data/' + JSON.parse(show_info).movie + '.png')} className="movie_poster" alt=""></img>
                <p className="booking_movie_title">{JSON.parse(movie_info).display_name}</p>
                <p className="booking_movie_title">Сеанс на {showtime_display(JSON.parse(show_info).showtime)}</p>
                {JSON.parse(selected_seats).length !== 0 && <>
                    <div className="selected_seats">
                        <span className="unselect_all clickable" onClick={() => set_selected_seats(JSON.stringify([]))}>
                            <img src={require('../icons/remove.png')} draggable="false" alt=""></img>
                        </span>
                            <p>Обрані місця: <span className="selected_seats_list">{JSON.parse(selected_seats).map((seat, index) => <><>{seat_display(seat[0], seat[1])}</>{index !== JSON.parse(selected_seats).length - 1 && <>, </>}</>)}</span></p>
                    </div>
                    <button className="booking_button">Перейти до бронювання</button>
                </>}
            </div>
        </div>
        );
    }