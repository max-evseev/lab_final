import {showtime_display, seat_display} from '../services/display_functions.js'
    export default function Booking_entry({entry, change_selected}) {
        function clear_selected() {
        localStorage.removeItem(entry.showtime);
        change_selected();
        }
        return (
        <div className="booking_entry">
            <div className="entry_header">
                <span className="unselect_all clickable" onClick={() => clear_selected()}>
                    <img src={require('../icons/remove.png')} draggable="false" alt=""></img>
                </span>
                <a href={'/booking/' + entry.showtime}>
                    <span>{showtime_display(entry.showtime)}</span>
                    <span>{require('../data/movies.json').find(({ id }) => id === require('../data/show_schedule.json').find(({ showtime }) => showtime === entry.showtime).movie).display_name}</span>
                </a>
            </div>
            <div className="entry_seats">
                {entry.seats.map((seat) => <span>{seat_display(seat[0], seat[1])}</span>)}
            </div>
        </div>
        );
    }