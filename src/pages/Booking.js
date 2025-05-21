import Booking_form from '../components/Booking_form'
import Booking_list from '../components/Booking_list'
import {useContext, useState} from 'react'
import {booking_context, set_context} from '../services/booking_service.js'
import {status_display} from '../services/display_functions.js'
    export default function Booking() {
    const {booking_list, set_booking_list} = useContext(booking_context);
    const [booking_status, set_booking_status] = useState(Number(sessionStorage.getItem('status')));
        async function booking_operation(status) {
        set_booking_status(102);
        sessionStorage.setItem('status', await status);
        localStorage.clear();
        set_booking_list(set_context());
        }
        return (
        <div className="booking_main_content">
            {JSON.parse(booking_list).length === 0 && <p className="text_message">
                {status_display(booking_status)}           
            </p>}
            {JSON.parse(booking_list).length !== 0 && <>
                <Booking_form booking_operation={booking_operation} booking_list={booking_list}></Booking_form>
                <Booking_list booking_list={JSON.parse(booking_list)} change_selected={() => set_booking_list(set_context())}></Booking_list>
            </>}
        </div>
        );
    }