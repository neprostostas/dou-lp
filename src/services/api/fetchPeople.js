import axios from 'axios';

export const fetchPeopleData = async () => {

    const API_URL = "https://dou.ua/calendar/dou-day-users/";

    try {
        const response = await axios.get(API_URL);
        const users = response?.data?.users;
        return users.map(user => ({
            src: user?.img_src,
            alt: user?.name,
            url: user?.url
        }));
    } catch (error) {
        console.error("Failed to fetch people data:", error);
        return [];
    }
};

export const goEvent = async (callback) => {

    // - якщо юзер не залогінен (window.USER_ID=="") - позвати функцію loginshow();
    // - якщо залогінен, то відправити оті json вище на /calendar/events-ajax/

    const API_URL = "https://dou.ua/calendar/events-ajax/";

    if (window.USER_ID !== '') {
        try {
            // Отримання кукі csrftoken
            const csrftoken = document.cookie.split('; ').find(row => row.startsWith('csrftoken=')).split('=')[1];

            // Формування даних у форматі x-www-form-urlencoded
            const params = new URLSearchParams();
            params.append('csrfmiddlewaretoken', window.CSRF_TOKEN);
            params.append('user', window.USER_ID);
            params.append('event_id', window.EVENT_ID);

            // Відправлення запиту з axios
            const response = await axios.post(API_URL, params, {
                headers: {
                    "X-CSRFToken": csrftoken,
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                withCredentials: true
            });

            // Логування відповіді сервера
            console.log('Response:', response.data);

            if(callback) callback();

        } catch (error) {
            console.error('Error:', error);
        }
    } else {
        loginshow();
    }

}