import Booking_entry from './Booking_entry'
    export default function Movie_list({booking_list, change_selected}) {
        function clear_everything() {
        localStorage.clear();
        change_selected();
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
        </div>);
    }