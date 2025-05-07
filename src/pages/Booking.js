import {useParams} from 'react-router-dom'
import {useState} from "react";
    export default function Booking() {
    const params = useParams();
    const [show_info, set_show_info] = useState(JSON.stringify(require('../data/show_schedule.json').find(({showtime}) => showtime === params.showtime)));
    const [movie_info, set_movie_info] = useState(JSON.stringify(require('../data/movies.json').find(({ id }) => id === JSON.parse(show_info).movie)));
        return (
        <div className="booking_main_content">
            <div className="cinema_hall">
                <img src={require('../icons/screen.png')} className="cinema_screen" alt=""></img>
                <div className="seat_section">
                    {JSON.parse(show_info).seats.map((seat_row) => <div className="seat_row">{seat_row.map((seat) => <span className="seat_section"></span>)}</div>) }
                </div>
            </div>
            <div className="cinema_side_content">
                <img src={require('../data/' + JSON.parse(show_info).movie + '.png')} className="movie_poster" alt=""></img>
                <p className="booking_movie_title">{JSON.parse(movie_info).display_name}</p>
                <p className="booking_movie_title">Сеанс на {JSON.parse(show_info).showtime}</p>
                <div className="selected_seats">
                    <span className="unselect_all">
                        <img src={require('../icons/remove.png')} draggable="false" alt=""></img>
                    </span>
                <p>Обрані місця: <span className="selected_seats_list">Ряд 1 Місце 2, Ряд 3 Місце 4</span></p>
                </div>
                <button className="booking_button">Перейти до бронювання</button>
            </div>
        </div>
        );
    }