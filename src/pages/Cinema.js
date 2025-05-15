import Cinema_hall from '../components/Cinema_hall'
import Cinema_movie_section from '../components/Cinema_movie_section'
import {useParams} from 'react-router-dom'
import {useContext, useState} from 'react'
import {booking_context, set_context} from '../services/booking_service.js'
    export default function Cinema() {
    const params = useParams();
    const [show_info] = useState(JSON.stringify(require('../data/show_schedule.json').find(({showtime}) => showtime === params.showtime)));
    const {booking_list, set_booking_list} = useContext(booking_context);
        return (
        <div className="cinema_main_content">
            <Cinema_hall show_info={JSON.parse(show_info)} booking_list={JSON.parse(booking_list)} change_selected={() => set_booking_list(set_context())}></Cinema_hall>
            <Cinema_movie_section show_info={JSON.parse(show_info)} booking_list={booking_list} change_selected={() => set_booking_list(set_context())}></Cinema_movie_section>
        </div>
        );
    }