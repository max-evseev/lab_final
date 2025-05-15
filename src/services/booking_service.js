import React, {useState} from 'react'
export const booking_context = React.createContext();
    export function set_context() {
    localstorage_validation();
    let list = [];
        for (let i = 0; i <= localStorage.length - 1; i++) {
            list.push({
            showtime: Object.entries(localStorage)[i][0],
            seats: JSON.parse(Object.entries(localStorage)[i][1])
            });
        }
    return JSON.stringify(list);
    }
    function localstorage_validation() {
        for (let i = 0; i <= localStorage.length - 1; i++) {
            if (require('../data/show_schedule.json').findIndex(item => item.showtime === Object.entries(localStorage)[i][0]) === -1) {
            localStorage.removeItem(Object.entries(localStorage)[i][0]);
            }
            else {
                try {
                JSON.parse(Object.entries(localStorage)[i][1]);
                    if (!Array.isArray(JSON.parse(Object.entries(localStorage)[i][1]))) {
                    localStorage.removeItem(Object.entries(localStorage)[i][0]);
                    }
                    else {
                        JSON.parse(Object.entries(localStorage)[i][1]).forEach((seat) => {
                            if (!Array.isArray(seat) || seat.length !== 2 || (typeof seat[0] !== 'number' || typeof seat[0] !== 'number') || (!Number.isInteger(seat[0]) || !Number.isInteger(seat[1])) || (seat[0] < 0 || seat[0] > require('../data/show_schedule.json')[require('../data/show_schedule.json').findIndex(item => item.showtime === Object.entries(localStorage)[i][0])].seats.length - 1) || (seat[1] < 0 || seat[1] > require('../data/show_schedule.json')[require('../data/show_schedule.json').findIndex(item => item.showtime === Object.entries(localStorage)[i][0])].seats[seat[0]].length - 1) || require('../data/show_schedule.json')[require('../data/show_schedule.json').findIndex(item => item.showtime === Object.entries(localStorage)[i][0])].seats[seat[0]][seat[1]] !== 'free' || JSON.parse(Object.entries(localStorage)[i][1]).filter((spot) => String(spot) === String(seat)).length !== 1) {
                            let new_array = JSON.parse(Object.entries(localStorage)[i][1]);
                            new_array.splice(new_array.findIndex(item => String(item) === String(seat)), 1);
                            localStorage.setItem(Object.entries(localStorage)[i][0], JSON.stringify(new_array));
                            }
                        });
                        if (JSON.parse(Object.entries(localStorage)[i][1]).length === 0) {
                        localStorage.removeItem(Object.entries(localStorage)[i][0]);
                        }
                    }
                } catch (e) {
                localStorage.removeItem(Object.entries(localStorage)[i][0]);
                }
            }
        }
    }
    export function Context_provider({children}) {
    const [booking_list, set_booking_list] = useState(set_context());
        return (
        <booking_context.Provider value={{booking_list, set_booking_list}}>
            {children}
        </booking_context.Provider>
        );
    }