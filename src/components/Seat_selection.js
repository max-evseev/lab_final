    export default function Seat_selection({selection_status, avaibility_status, select_handler}) {
        function click_handler() {
            if (avaibility_status === 'free') {
            select_handler();
            }
        }
        return (
        <span className={"seat_selection " + avaibility_status} onClick={() => click_handler()}></span> 
        );
    }
