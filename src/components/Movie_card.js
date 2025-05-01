import { useState } from "react";
    export default function Movie_card({ movie_info }) {
    const [highlight_status, set_highlight] = useState('');
        function runtime_display() {
        let minutes = movie_info.runtime;
        let hours = 0;
            while (minutes >= 60) {
            minutes -= 60;
            hours += 1;
            }
            if (hours !== 0 && minutes !== 0) {
            return String(hours) + ' год. ' + String(minutes) + ' хв.';
            }
            else if (hours === 0 && minutes !== 0) {
            return String(minutes) + ' хв.';
            }
            else if (hours !== 0 && minutes === 0) {
            return String(hours) + ' год.';
            }
        }
        function genres_display() {
        let display_value = '';
            movie_info.genres.forEach((genre, index) => {
                switch (genre) {
                case 'comedy': display_value += 'Комедія';
                break;
                case 'adventure': display_value += 'Пригоди';
                break;
                case 'fantasy': display_value += 'Фентезі';
                break;
                case 'action': display_value += 'Бойовик';
                break;
                }
                if (index !== movie_info.genres.length - 1) {
                display_value += ' • ';
                }
            });
        return display_value;
        }
        function digit_fix(value) {
            if (value.length === 1) {
            return '0' + value;
            }
            else {
            return value;
            }
        }
        return (
        <div className={"movie_card " + highlight_status} onMouseOver={() => set_highlight('active')} onMouseOut={() => set_highlight('inactive')}>
            <img className="movie_poster" src={require('../data/' + movie_info.id + '.png')} alt="" draggable="false"></img>
            <div className="movie_side_info">
                <p className="movie_title">{movie_info.display_name}</p>
                <p className="movie_subtitle">{genres_display()}</p>
                <p className="movie_subtitle">{runtime_display()} • {String(movie_info.age_restriction)}+</p>
                {movie_info.show_schedule.map((showtime) => <span>{digit_fix(String(new Date(showtime).getDate()))}.{digit_fix(String(new Date(showtime).getMonth() + 1))}.{String(new Date(showtime).getFullYear())} {digit_fix(String(new Date(showtime).getHours()))}:{digit_fix(String(new Date(showtime).getMinutes()))}</span>)}
            </div>
        </div>
        );
    }