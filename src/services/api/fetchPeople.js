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

export const goEvent = async () => {

    // - якщо юзер не залогінен (window.USER_ID=="") - позвати функцію loginshow();
    // - якщо залогінен, то відправити оті json вище на /calendar/events-ajax/

    const API_URL = "https://dou.ua/calendar/events-ajax/";

    if (window.USER_ID !== '') {
        try {
            // Отримання кукі csrftoken
            const csrftoken = document.cookie.split('; ').find(row => row.startsWith('csrftoken=')).split('=')[1];

            const response = await axios.post(API_URL, {
                // csrfmiddlewaretoken: window.CSRF_TOKEN,
                user: window.USER_ID,
                event_id: window.EVENT_ID
            }, {
                headers: {
                    "X-CSRFToken": csrftoken
                },
                withCredentials: true
            });

            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    } else {
        loginshow();
    }

}