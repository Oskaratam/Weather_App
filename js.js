const apiKey = '68e1a70385c4447ec9536bfd8ee37f28';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?&units=metric&q=';
const input = document.getElementById('placeInput'),
      searchBtn = document.getElementById('searchIcon'),
      clouds = document.getElementById('clouds');


async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404){
        document.querySelector('.error').style.display = 'block';
    }else {
    let data = await response.json();

    document.getElementById('placeName').innerHTML = data.name;
    document.getElementById('temperature').innerHTML = `${Math.round(data.main.temp)}°C`;
    document.getElementById('weather').innerHTML = `Weather: ${data.weather[0].main}`;
    document.getElementById('humidity').innerHTML = `Humidity: ${data.main.humidity}%`;
    document.getElementById('feelsLike').innerHTML = `Feels like: ${Math.round(data.main.feels_like)}°C`;
    console.log(data);
    const changeBg = () => {
        data.weather[0].main == 'Clouds' ? clouds.classList.add('active') : clouds.classList.remove('active'); 
    }
    changeBg();
    const response2 = await fetch('https://api.api-ninjas.com/v1/worldtime?city=' + data.name, {
        headers: {
            'X-Api-Key': 'tHQpETr7UX243zBP+O58CA==gIctvZwydPGeErQI'
        }
    });
    let data2 = await response2.json();
    console.log(data2);
    document.getElementById('time').innerHTML = data2.hour + ':' + data2.minute;
    document.querySelector('.error').style.display = 'none'
}
};
searchBtn.addEventListener('click', () =>{
    checkWeather(input.value);
})