import Seat_selection from './Seat_selection'
    export default function Cinema_hall({seats, selected_seats_array, change_selected}) {

        function select_seat(row, column) {
        let new_array = JSON.parse(selected_seats_array);
            if (new_array.findIndex(item => item[0] === row && item[1] === column) !== -1) {
            new_array.splice(new_array.findIndex(item => item[0] === row && item[1] === column), 1);
            }
            else {
            new_array.push([row, column]);
            }
            console.log(new_array);
        change_selected(JSON.stringify(new_array));
        }
        return (
        <div className="cinema_hall">
            <img src={require('../icons/screen.png')} className="cinema_screen" draggable="false" alt=""></img>
            <div className="seat_section">
                {seats.map((seat_row, row) => <div className="seat_row">{seat_row.map((seat, column) => <Seat_selection avaibility_status={seat} select_handler={() => select_seat(row, column)}></Seat_selection>)}</div>) }
            </div>
        </div>
        );
    }