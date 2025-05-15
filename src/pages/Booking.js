import Booking_form from '../components/Booking_form'
import Booking_list from '../components/Booking_list'
import {useContext} from 'react'
import {booking_context, set_context} from '../services/booking_service.js'
    export default function Booking() {
    const {booking_list, set_booking_list} = useContext(booking_context);
        return (
        <div className="booking_main_content">
            {JSON.parse(booking_list).length === 0 && <p className="not_found">
                Ви не обрали жодного місця
            </p>}
            {JSON.parse(booking_list).length !== 0 && <>
                <Booking_form ></Booking_form>
                <Booking_list booking_list={JSON.parse(booking_list)} change_selected={() => set_booking_list(set_context())}></Booking_list>
            </>}
        </div>
        );
    }