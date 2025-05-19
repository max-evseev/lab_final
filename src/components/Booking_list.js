import {price_display} from '../services/display_functions.js'
import Booking_entry from './Booking_entry'
    export default function Movie_list({booking_list, change_selected}) {
        function clear_everything() {
        localStorage.clear();
        change_selected();
        }
        function total_price() {
        let price = 0;
            booking_list.forEach((entry) => {
            price += require('../data/movies.json').find(({id}) => id === require('../data/show_schedule.json').find(({showtime}) => showtime === entry.showtime).movie).price * entry.seats.length;
            });
        return price;
        }
        return (
        <div className="booking_list">
            <div className="booking_list_header">
                <span className="unselect_all clickable" onClick={() => clear_everything()}>
                    <img src={require('../icons/remove.png')} draggable="false" alt=""></img>
                </span>
                <p>Обрані місця:</p>
            </div>
            {booking_list.map((entry) => <Booking_entry entry={entry} change_selected={change_selected}></Booking_entry>)}
            <p className="movie_price">Загальна вартість: {price_display(total_price())}</p>
        </div>);
    }