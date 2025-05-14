import Seat_selection from './Seat_selection'
    export default function Cinema_hall({show_info, booking_list, change_selected}) {
        function select_seat(row, column) {
            if (localStorage.getItem(show_info.showtime) === null) {
            localStorage.setItem(show_info.showtime, JSON.stringify([[row, column]]));
            }
            else {
            let new_array = JSON.parse(localStorage.getItem(show_info.showtime));
                if (new_array.findIndex(item => Number(item[0]) === row && Number(item[1]) === column) !== -1) {
                new_array.splice(new_array.findIndex(item => Number(item[0]) === row && Number(item[1]) === column), 1);
                }
                else {
                new_array.push([row, column]);
                }
                if (new_array.length === 0) {
                localStorage.removeItem(show_info.showtime);
                }
                else {
                localStorage.setItem(show_info.showtime, JSON.stringify(new_array));
                }
            }
        change_selected();
        }
        function select_seat_check(row, column) {
            if (booking_list.findIndex(item => item.showtime === show_info.showtime) !== -1) {
                if (booking_list[booking_list.findIndex(item => item.showtime === show_info.showtime)].seats.findIndex(item => Number(item[0]) === row && Number(item[1]) === column) === -1) {
                return ' unselected';
                }
                else {
                return ' selected';
                }
            }
            else {
            return ' unselected';
            }
        }
        return (
        <div className="cinema_hall">
            <img src={require('../icons/screen.png')} className="cinema_screen" draggable="false" alt=""></img>
            <div className="seat_section">
                {show_info.seats.map((seat_row, row) => <div className="seat_row">{seat_row.map((seat, column) => <Seat_selection avaibility_status={seat} selection_status={select_seat_check(row, column)} select_handler={() => select_seat(row, column)}></Seat_selection>)}</div>)}
            </div>
        </div>
        );
    }