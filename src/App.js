import Movie_list from './components/Movie_list'
import {runtime_display, genre_display, showtime_display} from './common_functions.js'
import {useState, useEffect} from "react";
var all_movies = require('./data/movies.json');
var min_price = null;
var max_price = null;
var min_showtime = null;
var max_showtime = null;
var min_runtime = null;
var max_runtime = null;
var min_restriction = null;
var max_restriction = null;
var all_genres = [];
    all_movies.forEach((movie) => {
        if (max_price === null) {
        max_price = movie.price;
        }
        else if (movie.price > max_price) {
        max_price = movie.price;
        }
        if (min_price === null) {
        min_price = movie.price;
        }
        else if (movie.price < min_price) {
        min_price = movie.price;
        }
        if (max_runtime === null) {
        max_runtime = movie.runtime;
        }
        else if (movie.runtime > max_runtime) {
        max_runtime = movie.runtime;
        }
        if (min_runtime === null) {
        min_runtime = movie.runtime;
        }
        else if (movie.runtime < min_runtime) {
        min_runtime = movie.runtime;
        }
        if (max_restriction === null) {
        max_restriction = movie.age_restriction;
        }
        else if (movie.age_restriction > max_restriction) {
        max_restriction = movie.age_restriction;
        }
        if (min_restriction === null) {
        min_restriction = movie.age_restriction;
        }
        else if (movie.age_restriction < min_restriction) {
        min_restriction = movie.age_restriction;
        }
        movie.show_schedule.forEach((showtime) => {
            if (max_showtime === null) {
            max_showtime = new Date(showtime).getTime();
            }
            else if (new Date(showtime).getTime() > max_showtime) {
            max_showtime = new Date(showtime).getTime();
            }
            if (min_showtime === null) {
            min_showtime = new Date(showtime).getTime();
            }
            else if (new Date(showtime).getTime() < min_showtime) {
            min_showtime = new Date(showtime).getTime();
            }
        });
        movie.genres.forEach((genre) => {
            if (!all_genres.includes(genre)) {
            all_genres.push(genre);
            }
        });
    });
    export default function App() {
    const [movie_list, set_list] = useState(all_movies);
    const [search_query, set_query] = useState('');
    const [filter_menu, set_filter_menu] = useState(false);
    const [sort_menu, set_sort_menu] = useState(false);
        const [filter, set_filter] = useState(JSON.stringify({
        price: [min_price, max_price],
        showtime: [min_showtime, max_showtime],
        runtime: [min_runtime, max_runtime],
        restriction: [min_restriction, max_restriction],
        genres: all_genres
        }));
        const [sorting, set_sorting] = useState(JSON.stringify({
        order: 'none',
        criteria: 'none'
        }));
        useEffect(() => {
        let query_result = [];
            console.log(filter);
            all_movies.forEach((movie) => {
            let search_condition = false;
                if (movie.display_name.toLowerCase().search(search_query.toLowerCase().trim()) === 0) {
                search_condition = true
                }
            let price_condition = false;
                if (movie.price >= JSON.parse(filter).price[0] && movie.price <= JSON.parse(filter).price[1]) {
                price_condition = true
                }
            let runtime_condition = false;
                if (movie.runtime >= JSON.parse(filter).runtime[0] && movie.runtime <= JSON.parse(filter).runtime[1]) {
                runtime_condition = true
                }
            let restriction_condition = false;
                if (movie.age_restriction >= JSON.parse(filter).restriction[0] && movie.age_restriction <= JSON.parse(filter).restriction[1]) {
                restriction_condition = true
                }
            let showtime_condition = false;
                movie.show_schedule.forEach((showtime) => {
                    if (new Date(showtime).getTime() >= JSON.parse(filter).showtime[0] && new Date(showtime).getTime() <= JSON.parse(filter).showtime[1]) {
                    showtime_condition = true;
                    }
                });
            let genres_condition = false;
                JSON.parse(filter).genres.forEach((genre) => {
                    if (movie.genres.includes(genre)) {
                    genres_condition = true;
                    }
                });
                if (search_condition && price_condition && showtime_condition && runtime_condition && restriction_condition && genres_condition) {
                query_result.push(movie);
                }
            });
        set_list(query_result);
        }, [search_query, filter]);
        const change_genres = (e, genre) => {
        let filter_new = JSON.parse(filter);
            switch (e.target.checked) {
            case true: filter_new.genres.push(genre);
            break;
            case false: filter_new.genres.splice(filter_new.genres.indexOf(genre), 1);
            break;
            }
        set_filter(JSON.stringify(filter_new));
        }
        const change_boundaries = (e, type, boundary) => {
        let filter_new = JSON.parse(filter);
        let position;
        let min_value;
        let max_value;
            switch (boundary) {
            case 'min': position = 0;
            break;
            case 'max': position = 1;
            break;
            }
            switch (type) {
            case 'price': filter_new.price[position] = Number(e.target.value);
            min_value = filter_new.price[0];
            max_value = filter_new.price[1];
                if (min_value >= max_value) {
                filter_new.price[0] = max_value;
                }
                if (max_value <= min_value) {
                filter_new.price[1] = min_value;
                }
            break;
            case 'showtime': filter_new.showtime[position] = Number(e.target.value);
            min_value = filter_new.showtime[0];
            max_value = filter_new.showtime[1];
                if (min_value >= max_value) {
                filter_new.showtime[0] = max_value;
                }
                if (max_value <= min_value) {
                filter_new.showtime[1] = min_value;
                }
            break;
            case 'runtime': filter_new.runtime[position] = Number(e.target.value);
            min_value = filter_new.runtime[0];
            max_value = filter_new.runtime[1];
                if (min_value >= max_value) {
                filter_new.runtime[0] = max_value;
                }
                if (max_value <= min_value) {
                filter_new.runtime[1] = min_value;
                }
            break;
            case 'restriction': filter_new.restriction[position] = Number(e.target.value);
            min_value = filter_new.restriction[0];
            max_value = filter_new.restriction[1];
                if (min_value >= max_value) {
                filter_new.restriction[0] = max_value;
                }
                if (max_value <= min_value) {
                filter_new.restriction[1] = min_value;
                }
            break;
            }
        set_filter(JSON.stringify(filter_new));
        }
        function layer_priority(value) {
            switch (value) {
            case true: return 'active_menu';
            break;
            case false: return '';
            break;
            }
        }
        return (
        <>
            <div className="search_section">
                <div className="search_input">
                    <img className="input_icon" src={require('./icons/search.png')} draggable="false" alt=""></img>
                    <input className="search_input" placeholder="Шукайте фільми..." value={search_query} onChange={e => set_query(e.target.value)}></input>
                </div>
                <div className={"parameter_section " + layer_priority(filter_menu)} onMouseOver={() => set_filter_menu(true)} onMouseOut={() => set_filter_menu(false)}>
                    <span className="parameter_button">
                        <img src={require('./icons/filter.png')} draggable="false" alt=""></img>
                    </span>
                    {filter_menu && <div className="parameter_menu">
                        <p className="menu_title">
                            Ціна
                        </p>
                        <div className="range_slider">
                            <input type="range" min={min_price} max={max_price} value={JSON.parse(filter).price[0]} onChange={(e) => change_boundaries(e, 'price', 'min')} step="0.25"></input>
                            <input type="range" min={min_price} max={max_price} value={JSON.parse(filter).price[1]} onChange={(e) => change_boundaries(e, 'price', 'max')} step="0.25"></input>
                        </div>
                        <div className="range_values">
                            <p>
                                {String(JSON.parse(filter).price[0].toFixed(2))} ГРН.
                            </p>
                            <p>
                                {String(JSON.parse(filter).price[1].toFixed(2))} ГРН.
                            </p>
                        </div>
                        <p className="menu_title">
                            Час сеансу
                        </p>
                        <div className="range_slider">
                            <input type="range" min={min_showtime} max={max_showtime} value={JSON.parse(filter).showtime[0]} onChange={(e) => change_boundaries(e, 'showtime', 'min')} step="900000"></input>
                            <input type="range" min={min_showtime} max={max_showtime} value={JSON.parse(filter).showtime[1]} onChange={(e) => change_boundaries(e, 'showtime', 'max')} step="900000"></input>
                        </div>
                        <div className="range_values">
                            <p>
                                {showtime_display(JSON.parse(filter).showtime[0])}
                            </p>
                            <p>
                                {showtime_display(JSON.parse(filter).showtime[1])}
                            </p>
                        </div>
                        <p className="menu_title">
                            Тривалість
                        </p>
                        <div className="range_slider">
                            <input type="range" min={min_runtime} max={max_runtime} value={JSON.parse(filter).runtime[0]} onChange={(e) => change_boundaries(e, 'runtime', 'min')} step="1"></input>
                            <input type="range" min={min_runtime} max={max_runtime} value={JSON.parse(filter).runtime[1]} onChange={(e) => change_boundaries(e, 'runtime', 'max')} step="1"></input>
                            </div>
                        <div className="range_values">
                            <p>
                                {runtime_display(JSON.parse(filter).runtime[0])}
                            </p>
                            <p>
                                {runtime_display(JSON.parse(filter).runtime[1])}
                            </p>
                        </div>
                        <p className="menu_title">
                            Вікові обмеження
                        </p>
                        <div className="range_slider">
                            <input type="range" min={min_restriction} max={max_restriction} value={JSON.parse(filter).restriction[0]} onChange={(e) => change_boundaries(e, 'restriction', 'min')} step="1"></input>
                            <input type="range" min={min_restriction} max={max_restriction} value={JSON.parse(filter).restriction[1]} onChange={(e) => change_boundaries(e, 'restriction', 'max')} step="1"></input>
                        </div>
                        <div className="range_values">
                            <p>
                                {String(JSON.parse(filter).restriction[0])}+
                            </p>
                            <p>
                                {String(JSON.parse(filter).restriction[1])}+
                            </p>
                        </div>
                        <p className="menu_title">
                            Жанри
                        </p>
                        <div className="genres_section">
                            {all_genres.map((genre) => <div className="checkbox_section">
                                <input type="checkbox" checked={JSON.parse(filter).genres.includes(genre)} onChange={(e) => change_genres(e, genre)}></input>
                                <span className="check_button">
                                    {JSON.parse(filter).genres.includes(genre) && <img src={require('./icons/check.png')} draggable="false" alt=""></img>}
                                </span>
                                <p>
                                    {genre_display(genre)}
                                </p>
                            </div>)}
                        </div>
                    </div>}
                </div>
                <div className={"parameter_section " + layer_priority(sort_menu)} onMouseOver={() => set_sort_menu(true)} onMouseOut={() => set_sort_menu(false)}>
                    <span className="parameter_button">
                        <img src={require('./icons/sort.png')} draggable="false" alt=""></img>
                    </span>
                    {sort_menu && <div className="parameter_menu"></div>}
                </div>
                <div className="parameter_section">
                    <span className="parameter_button">
                        <img src={require('./icons/remove.png')} draggable="false" alt=""></img>
                    </span>
                </div>
            </div>
            <div className="main_content">
                {movie_list.length === 0 && <p>По вашому запиту нічого не знайдено</p>}
                {movie_list.length !== 0 && <Movie_list movies={movie_list}></Movie_list>}    
            </div>
        </>
        );
    }