// const inputBox = document.querySelector('.input-box');
// const searchBtn = document.getElementById('searchBtn');
// const weather_img = document.querySelector('.weather-img');
// const temprature = document.querySelector('.temprature');
// const description = document.querySelector('.description');
// const humidity= document.querySelector('.humidity1');
// const wind_speed = document.querySelector('.wind-speed');


// async function checkweather(city){
//    const  api_key= "8f9e910ec831c253a4b1359f5cbfff38"
//     const  url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}` ;

//     const weather_data= await fetch(`${url}`).then(response => response.json());
     
    
//     console.log(weather_data);

//     temprature.innerHTML = `${weather_data.main.temp}<sup>o</sup>C`;

//      description.innerHTML=`${weather_data.weather[0].description}`

//     humidity.innerHTML = `${weather_data.main.humidity}%`

//     wind_speed.innerHTML = `${Math.round(weather_data.wind.speed)}Km/H`;

// switch(weather_data.weather[0].main.toLowerCase()) {
  

//     case 'clouds': 
//         weather_img.src = "./images/clouds1.png";
//         break;

//     case 'rain': 
//         weather_img.src = "./images/rainy_img.webp";
//         break;

//     case 'snow': 
//         weather_img.src = "./images/stormy.png";
//         break;

//     case 'thunderstorm': 
//         weather_img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5n8G6n2_ubfZINrS2CWMMFGfuLjvY31Ffgw&s";
//         break;
   
// }


// }


// searchBtn.addEventListener('click', () =>{
//     checkweather(inputBox.value);
// });

const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temprature = document.querySelector('.temprature');
const description = document.querySelector('.description');
const humidity = document.querySelector('.humidity1');
const wind_speed = document.querySelector('.wind-speed');
const weatherBody = document.querySelector('.weather-body');
const container = document.querySelector('.container');
const themeToggle = document.getElementById('checkbox');
const body = document.querySelector('body');

async function checkweather(city) {
    const api_key = "8f9e910ec831c253a4b1359f5cbfff38";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;

    try {
        const response = await fetch(url);
        const weather_data = await response.json();

        if (weather_data.cod === '404') {
            alert("City not found. Please try again.");
            weatherBody.style.display = "none";
            return;
        }

        weatherBody.style.display = "flex";
        temprature.innerHTML = `${Math.round(weather_data.main.temp)}<sup>o</sup>C`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${Math.round(weather_data.wind.speed)}Km/H`;

        updateWeatherAppearance(weather_data.weather[0].main.toLowerCase());

    } catch (error) {
        alert("An error occurred while fetching the weather data.");
        weatherBody.style.display = "none";
    }
}

function updateWeatherAppearance(weather) {
    switch (weather) {
        case 'clouds':
            weather_img.src = "./images/clouds1.png";
            break;
        case 'rain':
            weather_img.src = "./images/rainy_img.webp";
            break;
        case 'snow':
            weather_img.src = "./images/snow_img.jpg";
            break;
        case 'thunderstorm':
            weather_img.src = "./images/stormy.png";
            break;
        case 'clear':
            weather_img.src = "https://cdn-icons-png.flaticon.com/128/6974/6974833.png";
            break;
        case 'mist':
        case 'smoke':
        case 'haze':
        case 'dust':
        case 'fog':
        case 'sand':
        case 'ash':
        case 'squall':
        case 'tornado':
            weather_img.src = "https://cdn-icons-png.flaticon.com/128/4005/4005901.png";
            break;
        default:
            weather_img.src = "./weather-icon-removebg-preview.png";
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
}

themeToggle.addEventListener('change', switchTheme);

const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.checked = true;
    }
}

searchBtn.addEventListener('click', () => {
    checkweather(inputBox.value);
});

inputBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkweather(inputBox.value);
    }
});