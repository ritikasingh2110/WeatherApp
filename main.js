const apiKey="5c8db6fa407384aad38c70bbe068d494";

// const x=new Date().getHours();
// console.log(x);



function getWeather(){
    const c = document.getElementById('city').value;
    if(c == ''){
        alert("Enter a city name!!");
        return;
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${c}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
        showWeatherData(data);
        showMap(c);
        getForecast(c);
    })
    .catch(() => {
        document.getElementById('detail').innerHTML = "City Not Found!";
    });

}

function showWeatherData(data){
    const ci = document.getElementById('t');
    ci.innerHTML = "";
    const wdata = document.getElementById('detail');
    wdata.innerHTML = "";

    const name = document.createElement("h2");
    name.classList.add("cname");
    name.innerText = `${data.name}, ${data.sys.country}`;

    const d=new Date().toUTCString();
    const b=new Date().getHours();
    if(b<19 && b>4){
        document.body.style.backgroundImage = "url('image/sun.jpg')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundPosition = "center center"; 
    }else{
        document.body.style.backgroundImage = "url('image/sunset.webp')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundPosition = "center center"; 
    }

    const temp = document.createElement("p");
    temp.innerHTML = `<i class="fa-solid fa-temperature-three-quarters"></i> ${data.main.temp}°C`;
    temp.classList.add("tempe");

    const minTemp = document.createElement("p");
    minTemp.innerHTML = `<i class="fa-solid fa-arrow-down"></i> Min Temp: ${data.main.temp_min}°C`;

    const maxTemp = document.createElement("p");
    maxTemp.innerHTML = `<i class="fa-solid fa-arrow-up"></i> Max Temp: ${data.main.temp_max}°C`;

    const wind = document.createElement("p");
    wind.innerHTML = `<i class="fa-solid fa-wind"></i> Wind: ${data.wind.speed} m/s`;

    const clouds = document.createElement("p");
    clouds.innerHTML = `<i class="fa-solid fa-cloud"></i> Clouds: ${data.clouds.all}%`;

    const sunrise = document.createElement("p");
    sunrise.innerHTML = `<i class="fa-solid fa-sun"></i> Sunrise: ${new Date(data.sys.sunrise*1000).toLocaleTimeString()}`;

    const sunset = document.createElement("p");
    sunset.innerHTML = `<i class="fa-solid fa-moon"></i> Sunset: ${new Date(data.sys.sunset*1000).toLocaleTimeString()}`;

    ci.append(name,d,temp);
    wdata.append(minTemp, maxTemp, wind, clouds, sunrise, sunset);
}

document.getElementById("city").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});

function showMap(city){
    const mapDiv = document.getElementById('map');
    mapDiv.innerHTML = `<iframe src="https://www.google.com/maps?q=${city}&output=embed"></iframe>`;
}

function getForecast(city){
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
        showForecast(data.list);
    });
}

function showForecast(list) {
    const forecastDiv = document.getElementById('day');
    // forecastDiv.innerHTML = "<h2>5-Day Forecast</h2>";
    document.getElementById('day').innerHTML="";
    list = list.filter((item, index) => index % 8 === 0);

    list.forEach(item => {
        const card = document.createElement('div');
        card.className = "forecast-card";

        const date = document.createElement("h3");
        date.classList.add("forcastdate")
        date.innerText = new Date(item.dt_txt).toDateString();

        const temp = document.createElement("p");
        temp.innerHTML = `<i class="fa-solid fa-temperature-three-quarters"></i> Temp: ${item.main.temp}°C`;

        const wind = document.createElement("p");
        wind.innerHTML = `<i class="fa-solid fa-wind"></i> Wind: ${item.wind.speed} m/s`;

        const clouds = document.createElement("p");
        clouds.innerHTML = `<i class="fa-solid fa-cloud"></i> Cloudy: ${item.clouds.all}%`;

        card.append(date, temp, wind, clouds);
        forecastDiv.append(card);
    });
}
