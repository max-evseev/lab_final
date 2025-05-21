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
        case 'name_symbol': return 'Містить символи (Використовуйте українську кирилицю А-Я)';
        break;
        case 'name_apostrophe_only_inbetween': return 'Апостроф може лише бути в середині імені';
        break;
        case 'name_one_apostrophe_at_time': return 'Ім\'я не може містити кількох апострофів підряд';
        break;
        case 'name_one_space_at_time': return 'Ім\'я не може містити кількох пробілів підряд';
        break;
        case 'email_no_at': return 'Повинен містити символ "@"';
        break;
        case 'email_multiple_at': return 'Повинен містити лише один символ "@"';
        break;
        case 'email_no_username': return 'Відсутнє ім\'я користувача';
        break;
        case 'email_username_delimiters_only_inbetween': return 'Розділювачі можуть лише бути в середині імені користувача';
        break;
        case 'email_username_one_delimiter_at_time': return 'Ім\'я користувача не може містити кількох розділювачів підряд';
        break;
        case 'email_username_invalid_symbols': return 'Ім\'я користувача лише приймає символи A-Z, 0-9, "-", "_" та "."';
        break;
        case 'email_no_domain': return 'Відсутній домен пошти';
        break;
        case 'email_domain_no_dot': return 'В домені повинна знаходитись крапка';
        break;
        case 'email_domain_dots_only_inbetween': return 'Крапка може лише бути в середині домену';
        break;
        case 'email_domain_one_dot_at_time': return 'Домен не може містити кількох крапок підряд';
        break;
        case 'email_domain_dash_only_inbetween': return 'Тире може лише бути в середині піддомену';
        break;
        case 'email_domain_one_dash_at_time': return 'Піддомен не може містити кількох тире підряд';
        break;
        case 'email_domain_invalid_symbols': return 'Домен лише приймає символи A-Z, "-" та "."';
        break;
        case 'phone_too_short': return 'Занадто мало символів (Має бути 13)';
        break;
        case 'phone_too_long': return 'Занадто багато символів (Має бути 13)';
        break;
        case 'phone_invalid_beginning': return 'Неправильний початок (Починайте з +380)';
        break;
        case 'phone_symbol': return 'Містить символи (Використовуйте 0-9)';
        break;
        case 'valid': return 'Дані введено правильно';
        break;
        }
    }
    export function status_display(value) {
        switch (value) {
        case 0: return 'Ви не обрали жодного місця';
        break;
        case 102: return 'Зачекайте будь-ласка...';
        break;
        case 201: return 'Бронювання пройшло успішно, ваші квитки було надіслано на пошту. Не забудьте підтвердити бронювання на касі!';
        break;
        case 400: return 'З вашої сторони було надіслано некоректні дані';
        break;
        case 401: return 'У вас немає повноважень на цю дію';
        break;
        case 403: return 'Ви не надали ваші дані';
        break;
        case 404: return 'Сеанс, на який ви намагаєтесь забронювати місце, відсутній';
        break;
        case 405: return 'Ви намагаєтесь здійснити заборонену дію';
        break;
        case 409: return 'Певні місця, які ви намагаєтесь забронювати, недоступні';
        break;
        case 410: return 'Сталась помилка доступу до бази даних сеансів';
        break;
        case 500: return 'Сталась непередбачена помилка на сервері';
        break;
        case 501: return 'Ви намагаєтесь здійснити неіснуючу на сервері дію';
        break;
        }
    }