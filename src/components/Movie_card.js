    export default function Movie_card({ movie_info }) {
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
        let movie_genres = '';
            movie_info.genres.forEach((genre, index) => {
                switch (genre) {
                case 'comedy': movie_genres += 'Комедія';
                break;
                case 'adventure': movie_genres += 'Пригоди';
                break;
                case 'fantasy': movie_genres += 'Фентезі';
                break;
                case 'action': movie_genres += 'Бойовик';
                break;
                }
                if (index !== movie_info.genres.length - 1) {
                movie_genres += ', ';
                }
            });
        return movie_genres;
        }
        return (
        <div className="movie_card">
            <p className="movie_title">{movie_info.display_name}</p>
            <p className="movie_genres">{'Жанри: ' + genres_display()}</p>
            <p className="movie_runtime">{'Тривалість: ' + runtime_display()}</p>
            <p className="movie_restriction">{'Вікове обмеження: ' + String(movie_info.age_restriction) + '+'}</p>
        </div>
        );
    }