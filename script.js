const body = document.querySelector("body");
let info;
let ar;
const URL =
  "https://api.unsplash.com/search/photos?client_id=pULdBokJuBTPraPTctuvgnjZIFzCPIcx96fUVTGAVmU&query=";
var imag =
  "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80";

async function background_update() {
  try {
    console.log(document.querySelector(".search-bar").value);
    let ur = URL + document.querySelector(".search-bar").value;
    await fetch(ur)
      .then((response) => response.json())
      .then((data) => {
        info = data.results;
      });
  } catch (e) {
    console.log(e);
  }
}

let weather = {
  apiKey: "60f3e9cbdb3056c8d18581901ee2cc78",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    console.log(name, icon, description, temp, humidity, speed);
    document.querySelector(".city").innerText = name;
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerHTML = parseInt(temp) + "&deg C";
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + speed + "km/h";
    document.querySelector(".weather").classList.remove("loading");
  },
  search: function () {
    background_update();
    setTimeout(function () {
      let x = Math.floor(Math.random() * 10);
      ar = info[x].urls.raw;
      body.style.backgroundImage = `url(${ar})`;
    }, 1000);
    console.log(ar);
    this.fetchWeather(document.querySelector(".search-bar").value);
    document.querySelector(".search-bar").value = "";
  },
};

weather.fetchWeather("delhi");
body.style.backgroundImage =
  "url('https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80)";
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function () {
  if (event.key == "Enter") {
    weather.search();
  }
});
