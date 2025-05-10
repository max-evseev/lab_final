import Cinema_hall from '../components/Cinema_hall'
import Cinema_movie_section from '../components/Cinema_movie_section'
import {useParams} from 'react-router-dom'
import {useState} from 'react'
    export default function Booking() {
    const params = useParams();
    const [show_info] = useState(JSON.stringify(require('../data/show_schedule.json').find(({showtime}) => showtime === params.showtime)));
    const [selected_seats, set_selected_seats] = useState(JSON.stringify([]));
        function change_selected_seats(new_array) {
        set_selected_seats(new_array);
        }
        async function commit_booking() {
            fetch('/update_list', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: selected_seats
            }).then(window.location.reload());
        }
        return (
        <div className="booking_main_content">
            <Cinema_hall seats={JSON.parse(show_info).seats} selected_seats={selected_seats} change_selected={change_selected_seats}></Cinema_hall>
            <Cinema_movie_section movie={JSON.parse(show_info).movie} showtime={params.showtime} selected_seats={selected_seats} unselect_all={() => set_selected_seats(JSON.stringify([]))} commit_booking={commit_booking}></Cinema_movie_section>
        </div>
        );
    }