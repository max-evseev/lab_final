import {} from '../services/display_functions.js'
import {useState} from 'react'
    export default function Booking_form() {
    const [name, set_name] = useState('');
    const [email, set_email] = useState('');
    const [phone, set_phone] = useState('');
        return (
        <div className="booking_form">
            <p className="form_header">Бронювання квитків</p>
            <p className="form_desc">Щоб забронювати обрані вами місця, вкажіть наступні дані та натисніть кнопку "Забронювати".</p>
            <div className="form_input">
                <img className="input_icon" src={require('../icons/name.png')} draggable="false" alt=""></img>
                <input className="form_input" placeholder="Повне ім'я" value={name} onChange={(e) => set_name(e.target.value)}></input>
            </div>
            <div className="form_input">
                <img className="input_icon" src={require('../icons/mail.png')} draggable="false" alt=""></img>
                <input className="form_input" placeholder="Пошта" value={email} onChange={(e) => set_email(e.target.value)}></input>
            </div>
            <div className="form_input">
                <img className="input_icon" src={require('../icons/phone.png')} draggable="false" alt=""></img>
                <input className="form_input" placeholder="Телефон" value={phone} onChange={(e) => set_phone(e.target.value)}></input>
            </div>
            <button className="form_button">Забронювати</button>
        </div>
        );
    }