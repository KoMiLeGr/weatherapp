let weather = {
    "apikey": "d5984b5fde067df4c258c9230772965e",
    fetchWeather: function (city) {
    fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" 
        + city
        + "&units=imperial&appid=" 
        + this.apikey
    ) 
    .then((response) => response.json())
    .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description} = data.weather[0];
        const { temp, humidity, feels_like, temp_min, temp_max} = data.main;
        const { speed,} = data.wind;
        console.log(name,icon,description,temp,humidity,speed,feels_like, temp_max, temp_min)
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector('.description').innerText = description;
        document.querySelector(".temp").innerText = temp + "°F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + "mph";
        document.querySelector(".feels_like").innerText= "Feels Like: " + feels_like + "°F";
        document.querySelector(".temp_max").innerText= "Day Max: " + temp_max + "°F";
        document.querySelector(".temp_min").innerText= "Day Min: " + temp_min + "°F";
        document.querySelector(".weather.loading").classList.remove("loading");

    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        weather.search()
    }
});
document.querySelector(".search button").addEventListener("click", async () => {
    let randomImage = await getNewImage();
    imageToDisplay.src = randomImage;
});
async function getNewImage() {
    let randomNumber = Math.floor(Math.random() * 10);
    return fetch(requestUrl)
        .then((response) => response.json())
        .then((data) => {
            let allImages=data.results[randomNumber];
            return allImages.urls.regular;
        });
}
weather.fetchWeather("Cheney");