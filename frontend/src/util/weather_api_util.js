import axios from 'axios';

export const fetchWeather = (lat,lng) => {
    console.log(lat)
    console.log(lng)
    let url = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=ff73536f48ae4d3c3b9179833e630eaf`
    return axios.get(url);
};