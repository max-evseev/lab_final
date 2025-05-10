import {useState} from 'react'
    export default function Seat_selection({selection_status, avaibility_status, select_handler}) {
    const [animations_disable, set_animations] = useState(' disable');
        function click_handler() {
            if (avaibility_status === 'free') {
            set_animations('');
            select_handler();
            }
        }
        return (
        <span className={"seat_selection " + avaibility_status + selection_status + animations_disable} onClick={() => click_handler()}></span> 
        );
    }
