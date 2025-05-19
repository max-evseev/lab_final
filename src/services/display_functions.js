    function digit_fix(value) {
        if (value.length === 1) {
        return '0' + value;
        }
        else {
        return value;
        }
    }
    export function price_display(value) {
    return String(value.toFixed(2)) + ' ГРН.';
    }
    export function runtime_display(value) {
    let minutes = value;
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
    export function genre_display(value) {
        switch (value) {
        case 'comedy': return 'Комедія';
        break;
        case 'adventure': return 'Пригоди';
        break;
        case 'fantasy': return 'Фентезі';
        break;
        case 'action': return 'Бойовик';
        break;
        case 'horror': return 'Жахи';
        break;
        case 'thriller': return 'Триллер';
        break;
        case 'drama': return 'Драма';
        break;
        case 'sci-fi': return 'Наукова фантастика';
        break;
        case 'superhero': return 'Супергерої';
        break;
        case 'crime': return 'Кримінал';
        break;
        }
    }
    export function genre_list_display(value) {
    let display_value = '';
        value.forEach((genre, index) => {
        display_value += genre_display(genre);
            if (index !== value.length - 1) {
            display_value += ' • ';
            }
        });
    return display_value;
    }
    export function showtime_display(value) {
    return digit_fix(String(new Date(value).getDate())) + '.' + digit_fix(String(new Date(value).getMonth() + 1)) + '.' + String(new Date(value).getFullYear()) + ' ' + digit_fix((String(new Date(value).getHours()))) + ':' + digit_fix((String(new Date(value).getMinutes())));
    }
    export function seat_display(row, column) {
    return 'Ряд ' + String(row + 1) + ' Місце ' + String(column + 1);
    }
    export function seat_list_display(value) {
    let display_value = '';
        value.forEach((seat, index) => {
        display_value += seat_display(seat[0], seat[1]);
            if (index !== value.length - 1) {
            display_value += ', ';
            }
        });
    return display_value;
    }
    export function validity_display(value) {
        switch (value) {
        case 'empty': return 'Поле пусте';
        break;
        case 'valid': return 'Дані введено правильно';
        break;
        }
    }