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
        let destroy_entry = false;
            if (require('../data/show_schedule.json').findIndex(item => item.showtime === Object.entries(localStorage)[i][0]) === -1) {
            destroy_entry = true;
            }
            else {
                try {
                JSON.parse(Object.entries(localStorage)[i][1]);
                    if (!Array.isArray(JSON.parse(Object.entries(localStorage)[i][1]))) {
                    destroy_entry = true;
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
                        destroy_entry = true;
                        }
                    }
                } catch (e) {
                destroy_entry = true;
                }

            }
            if (destroy_entry) {
            localStorage.removeItem(Object.entries(localStorage)[i][0]);
            }
            else {
            let new_array = JSON.parse(Object.entries(localStorage)[i][1]);
                new_array.sort((a, b) => {
                    if (a[0] < b[0] || (a[0] === b[0] && a[1] < b[1])) {
                    return -1;
                    }
                    else if (a[0] > b[0] || (a[0] === b[0] && a[1] > b[1])) {
                    return 1;
                    }
                    else {
                    return 0;
                    }
                });
            localStorage.setItem(Object.entries(localStorage)[i][0], JSON.stringify(new_array));
            }
        }
    }
    export function name_validity(value) {
        if (value === '') {
        return 'empty';
        }
        else if (value.search(/[a-zA-Z]/) !== -1) {
        return 'name_latin';
        }
        else if (value.search(/[0-9]/) !== -1) {
        return 'name_number';
        }
        else if (!(value.search(/\W|_/) !== -1 && value.search(/[ёЁыЫъЪ]/) === -1 && value.search(/[А-Яа-яіІїЇґҐ\s]/) !== -1)) {
        return 'name_symbol';
        }
        else {
        return 'valid';
        }
    }
    export function email_validity(value) {
    const username = value.substring(0, value.search(/@/));
    const domain = value.substring(value.search(/@/) + 1, value.length);
        console.log(username)
        if (value === '') {
        return 'empty';
        }
        else if (value.search(/@/) === -1) {
        return 'email_no_at';
        }
        else if (value.match(/@/g).length > 1) {
        return 'email_multiple_at';
        }
        else if (username.length === 0) {
        return 'email_no_username';
        }
        else if (username[0] === '-' || username[username.length - 1] === '-' === 0 || username[0] === '_' || username[username.length - 1] === '_' === 0 || username[0] === '.' || username[username.length - 1] === '.' === 0) {
        return 'email_username_delimiters_only_inbetween';
        }
        else if (username.search(/[-_\.]{2,}/) !== -1) {
        return 'email_username_one_delimiter_at_time';
        }
        else if (username.search(/[^a-z0-9-_\.]/) !== -1) {
        return 'email_username_invalid_symbols';
        }
        else if (domain.length === 0) {
        return 'email_no_domain';
        }
        else if (domain.search(/\./) === -1) {
        return 'email_domain_no_dot';
        }
        else if (domain[0] === '.' || domain[domain.length - 1] === '.') {
        return 'email_domain_dots_only_inbetween';
        }
        else if (domain.search(/\.{2,}/) !== -1) {
        return 'email_domain_one_dot_at_time';
        }
        else if (domain[0] === '-' || domain[domain.length - 1] === '-' || domain.search(/\.-|-\./) !== -1) {
        return 'email_domain_dash_only_inbetween';
        }
        else if (domain.search(/-{2,}/) !== -1) {
        return 'email_domain_one_dash_at_time';
        }
        else if (domain.search(/[^a-z-\.]/) !== -1) {
        return 'email_domain_invalid_symbols';
        }
        else {
        return 'valid';
        }
    }
    export function phone_validity(value) {
        if (value === '') {
        return 'empty';
        }
        else if (value.length < 13) {
        return 'phone_too_short';
        }
        else if (value.length > 13) {
        return 'phone_too_long';
        }
        else if (value.search(/^\+380/) !== 0) {
        return 'phone_invalid_beginning';
        }
        else if (value.substring(1, value.length).search(/[^0-9]/) !== -1) {
        return 'phone_symbol';
        }
        else {
        return 'valid';
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