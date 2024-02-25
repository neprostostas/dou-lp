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
