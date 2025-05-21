import {validity_display} from '../services/display_functions.js'
import {name_validity, email_validity, phone_validity, commit_booking} from '../services/booking_service.js'
import {useState} from 'react'
    export default function Booking_form({booking_operation, booking_list}) {
    const [name, set_name] = useState('');
    const [email, set_email] = useState('');
    const [phone, set_phone] = useState('');
        function button_lock() {
            if (name_validity(name) !== 'valid' || email_validity(email) !== 'valid' || phone_validity(phone) !== 'valid') {
            return ' locked';
            }
            else {
            return '';
            }
        }
        function validity_icon(value) {
            if (value === 'valid') {
            return 'check';
            }
            else {
            return 'remove';
            }
        }
        const click_handler = async () => {
        let status = await commit_booking(JSON.stringify({email: email, name: name, phone: phone, list: JSON.parse(booking_list)}, ));
        booking_operation(status);
        }
        return (
        <div className="booking_form">
            <p className="form_header">Бронювання квитків</p>
            <p className="form_desc">Щоб забронювати обрані вами місця, вкажіть ім'я, за яким ми будем до вас звертатись, адресу електронної пошти, куди ми вам надішлемо електронні квитки, та номер за яким ви підтвердите бронь на касі. Натисніть кнопку "Забронювати" щоб продовжити бронювання. Майте на увазі, якщо ви не підтвердите бронь на касі, вона скасується за 12 годин після бронювання.</p>
            <div className="form_input">
                <img className="input_icon" src={require('../icons/name.png')} draggable="false" alt=""></img>
                <input className="form_input" placeholder="Ім'я" value={name} onChange={(e) => set_name(e.target.value.trim())}></input>
            </div>
            <div className="validity_section">
                <img src={require('../icons/' + validity_icon(name_validity(name)) +'.png')} draggable="false" alt=""></img>
                <p>{validity_display(name_validity(name))}</p>
            </div>
            <div className="form_input">
                <img className="input_icon" src={require('../icons/mail.png')} draggable="false" alt=""></img>
                <input className="form_input" placeholder="Пошта" value={email} onChange={(e) => set_email(e.target.value.trim().toLowerCase())}></input>
            </div>
            <div className="validity_section">
                <img src={require('../icons/' + validity_icon(email_validity(email)) +'.png')} draggable="false" alt=""></img>
                <p>{validity_display(email_validity(email))}</p>
            </div>
            <div className="form_input">
                <img className="input_icon" src={require('../icons/phone.png')} draggable="false" alt=""></img>
                <input className="form_input" placeholder="Телефон" value={phone} onChange={(e) => set_phone(e.target.value.trim())}></input>
            </div>
            <div className="validity_section">
                <img src={require('../icons/' + validity_icon(phone_validity(phone)) +'.png')} draggable="false" alt=""></img>
                <p>{validity_display(phone_validity(phone))}</p>
            </div>
            <button className={"form_button" + button_lock()} disabled={button_lock() === ' locked'} onClick={() => click_handler()}>Забронювати</button>
        </div>
        );
    }