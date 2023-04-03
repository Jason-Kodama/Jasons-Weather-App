// Create variables to use within
var searchInput = document.querySelector(".search-bar");
var searchButton = document.querySelector(".search-btn");
var currentContainerEl = document.querySelector("#current-container");
var forecastContainerEl = document.querySelector("#forecast-container");
var searchForm = document.getElementById('search-form')



searchForm.addEventListener('submit', (event) => {
    event.preventDefault()
    var city = searchInput.value;

   fetch(` https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=ed4723a27e6c8e93c11e90cd3192a422`)
    .then(res => res.json())
    .then(data => {
        console.log(data)

        for (let index = 0; index < data.list.length; index += 8) {
            const forecastData = data.list[index]
            
            const card = document.createElement('div')

            card.classList.add('card')

            const date = new Date(forecastData.dt * 1000)
            const dateEl = document.createElement('h2')
            dateEl.textContent = date.toLocaleDateString()
            card.appendChild(dateEl)

            const iconCode = forecastData.weather[0].icon
            const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`
            const iconElement = document.createElement('img')
            iconElement.src = iconUrl
            card.appendChild(iconElement)

            const temp = forecastData.main.temp;
            const tempEl = document.createElement('p')
            tempEl.textContent = `Temp: ${temp}°F`
            card.appendChild(tempEl)

            const humidity = forecastData.main.humidity;
            const humidityEl = document.createElement('p')
            humidityEl.textContent = `Humidity: ${humidity}%`
            card.appendChild(humidityEl)

            const wind = forecastData.wind.speed
            const windEl = document.createElement('p')
            windEl.textContent = `Wind Speed: ${wind}MPH`
            card.appendChild(windEl)

            forecastContainerEl.appendChild(card)

        }
    })
    .catch(err => {
        console.error(err)
        forecastContainerEl.textContent = 'Please enter a city'
    })
})

//fetch api
var weather = {
    "apiKey": "ed4723a27e6c8e93c11e90cd3192a422",
    fetchWeather: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + this.apiKey)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        forecastContainerEl.innerHTML = "";
        const { name } = data;
        const { icon , description } = data.weather[0]
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name,icon,description,temp,humidity,speed)
        var today = dayjs().format('(M/DD/YYYY)');
        
        document.querySelector(".city").innerText = name + "" + today;
        document.querySelector(".icon").src ="https://openweathermap.org/img/w/" + icon + ".png"
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + "mph";
        
        saved.push(name);

        localStorage.setItem("historyList", JSON.stringify(saved));
        listBuilder(name);
        searchInput.value = "";
        
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
        
    },
    
}
const history = document.getElementById("historyList")
let saved = localStorage.getItem("historyList")
?JSON.parse(localStorage.getItem("historyList"))
: [];
const listBuilder = (text) => {
    const histories = document.createElement("li");
    histories.innerText = text;
    history.appendChild(histories);
    
}

document.querySelector(".search-btn").addEventListener("click", function() {
    
    $("forecastContainerEl").hide
    weather.search();
   
});
//