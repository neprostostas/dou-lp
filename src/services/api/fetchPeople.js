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
    const API_URL = "https://dou.ua/calendar/events-ajax/";

    if (window.USER_ID !== '') {
        try {
            const csrftoken = document.cookie.split('; ').find(row => row.startsWith('csrftoken=')).split('=')[1];
            const params = new URLSearchParams();
            params.append('csrfmiddlewaretoken', window.CSRF_TOKEN);
            params.append('user', window.USER_ID);
            params.append('event_id', window.EVENT_ID);

            const response = await axios.post(API_URL, params, {
                headers: {
                    "X-CSRFToken": csrftoken,
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                withCredentials: true
            });

            console.log('Response:', response.data);

            if (response.data.type === 'add') {
                return {
                    success: true,
                    eventData: {
                        imgSrc: response.data.img_src,
                        name: response.data.name,
                        url: response.data.url
                    }
                };
            } else {
                return { success: false };
            }
        } catch (error) {
            console.error('Error:', error);
            return { success: false };
        }
    } else {
        loginshow();
        return { success: false };
    }
};
