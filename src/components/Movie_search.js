import {useState, useEffect} from 'react';
import {runtime_display, genre_display, showtime_display} from '../services/display_functions.js'
const all_movies = require('../data/movies.json');
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
    const default_filter = {
    query: '',
    price: [min_price, max_price],
    showtime: [min_showtime, max_showtime],
    runtime: [min_runtime, max_runtime],
    restriction: [min_restriction, max_restriction],
    genres: all_genres,
    sorting: ['none', 'none']
    }
    export default function Movie_search({set_list}) {
    const [active_menu, set_active_menu] = useState(null);
    const [filter, set_filter] = useState(JSON.stringify(default_filter));
    const [sort_animations, set_sort_animations] = useState(' disable');
        useEffect(() => {
        set_sort_animations('');
        let query_result = [];
            all_movies.forEach((movie) => {
            let search_condition = false;
                if (movie.display_name.toLowerCase().search(JSON.parse(filter).query.toLowerCase().trim()) === 0) {
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
        let order = null;
            switch (JSON.parse(filter).sorting[0]) {
            case 'asc': order = 1;
            break;
            case 'desc': order = -1;
            break;
            }
            switch (JSON.parse(filter).sorting[1]) {
            case 'none': let shuffle_index = query_result.length;
                while (shuffle_index != 0) {
                let replace_index = Math.floor(Math.random() * shuffle_index);
                shuffle_index--;
                [query_result[shuffle_index], query_result[replace_index]] = [query_result[replace_index], query_result[shuffle_index]];
                }
            break;
            case 'name': query_result.sort((a, b) => {
                if (a.display_name.toLowerCase() < b.display_name.toLowerCase()) {
                return -order;
                }
                else if (a.display_name.toLowerCase() > b.display_name.toLowerCase()) {
                return order;
                }
                else {
                return 0;
                }
            });
            break;
            case 'price': query_result.sort((a, b) => order * (a.price - b.price));
            break;
            case 'runtime': query_result.sort((a, b) => order * (a.runtime - b.runtime));
            break;
            case 'restriction': query_result.sort((a, b) => order * (a.age_restriction - b.age_restriction));
            break;
            case 'closest_show': query_result.sort((a, b) => order * (new Date(a.show_schedule[0]).getTime() - new Date(b.show_schedule[0]).getTime()));
            break;
            case 'latest_show': query_result.sort((a, b) => order * (new Date(a.show_schedule[a.show_schedule.length - 1]).getTime() - new Date(b.show_schedule[b.show_schedule.length - 1]).getTime()));
            break;
            }
        set_list(JSON.stringify(query_result));
        }, [filter]);
        useEffect(() => {
            if (active_menu === 'sort') {
            set_sort_animations(' disable');
            }
        }, [active_menu]);
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
        const set_query = (e) => {
        let filter_new = JSON.parse(filter);
        filter_new.query = e.target.value;
        set_filter(JSON.stringify(filter_new));
        }
        function change_order(value) {
        let filter_new = JSON.parse(filter);
        filter_new.sorting[0] = value;
            if (value === 'none') {
            filter_new.sorting[1] = 'none';
            }
            else if (value !== 'none' && JSON.parse(filter).sorting[1] === 'none') {
            filter_new.sorting[1] = 'name';
            }
        set_filter(JSON.stringify(filter_new));
        }
        function change_criteria(value) {
            if (JSON.parse(filter).sorting[0] !== 'none') {
            let filter_new = JSON.parse(filter);
            filter_new.sorting[1] = value;
            set_filter(JSON.stringify(filter_new));
            }
        }
        function layer_priority(value) {
            if (active_menu === value) {
            return ' active_menu';
            }
            else {
            return '';
            }
        }
        function menu_check(value) {
            if (active_menu === value) {
            return true;
            }
            else {
            return false;
            }
        }
        function sort_checker(value, position) {
            if (value === JSON.parse(filter).sorting[position]) {
            return ' selected_sort';
            }
            else {
            return '';
            }
        }
        function sort_aviability_checker() {
            if (JSON.parse(filter).sorting[0] !== 'none') {
            return ' available';
            }
            else {
            return '';
            }
        }
        return (
        <div className="search_section">
            <div className="search_input">
                <img className="input_icon" src={require('../icons/search.png')} draggable="false" alt=""></img>
                <input className="search_input" placeholder="Пошук" value={JSON.parse(filter).query} onChange={(e) => set_query(e)}></input>
            </div>
            <div className={"parameter_section" + layer_priority('filter')} onMouseOver={() => set_active_menu('filter')} onMouseOut={() => set_active_menu(null)}>
                <span className="parameter_button">
                    <img src={require('../icons/filter.png')} draggable="false" alt=""></img>
                </span>
                {menu_check('filter') && <div className="parameter_menu filter">
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
                                {JSON.parse(filter).genres.includes(genre) && <img src={require('../icons/check.png')} draggable="false" alt=""></img>}
                            </span>
                            <p>
                                {genre_display(genre)}
                            </p>
                        </div>)}
                    </div>
                </div>}
            </div>
            <div className={"parameter_section" + layer_priority('sort') + sort_animations} onMouseOver={() => set_active_menu('sort')} onMouseOut={() => set_active_menu(null)}>
                <span className="parameter_button">
                    <img src={require('../icons/sort.png')} draggable="false" alt=""></img>
                </span>
                {menu_check('sort') && <div className="parameter_menu sort">
                    <p className="menu_title">
                        Порядок
                    </p>
                    <div className="order_sort_section">
                        <span className={"left" + sort_checker('none', 0)} onClick={() => change_order('none')}>
                            Відсутній
                        </span>
                        <span className={"center" + sort_checker('asc', 0)} onClick={() => change_order('asc')}>
                            Зростаючий
                        </span>
                        <span className={"right" + sort_checker('desc', 0)} onClick={() => change_order('desc')}>
                            Спадний
                        </span>
                    </div>
                    <p className="menu_title">
                        Критерій
                    </p>
                    <div className="criteria_sort_section">
                        <span className={"top" + sort_checker('name', 1) + sort_aviability_checker()} onClick={() => change_criteria('name')}>
                                Назва
                        </span>
                        <span className={"center" + sort_checker('price', 1) + sort_aviability_checker()} onClick={() => change_criteria('price')}>
                            Ціна
                        </span>
                        <span className={"center" + sort_checker('runtime', 1) + sort_aviability_checker()} onClick={() => change_criteria('runtime')}>
                            Тривалість
                        </span>
                        <span className={"center" + sort_checker('restriction', 1) + sort_aviability_checker()} onClick={() => change_criteria('restriction')}>
                            Вікове обмеження
                        </span>
                        <span className={"center" + sort_checker('closest_show', 1) + sort_aviability_checker()} onClick={() => change_criteria('closest_show')}>
                            Найближчий сеанс
                        </span>
                        <span className={"bottom" + sort_checker('latest_show', 1) + sort_aviability_checker()} onClick={() => change_criteria('latest_show')}>
                            Найпізніший сеанс
                        </span>
                    </div>
                </div>}
            </div>
            <div className="parameter_section">
                <span className="parameter_button clickable" onClick={() => set_filter(JSON.stringify(default_filter))}>
                    <img src={require('../icons/remove.png')} draggable="false" alt=""></img>
                </span>
            </div>
        </div>
        )
    }