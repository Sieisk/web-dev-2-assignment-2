const apiKey = "9c1882413e094d2029554458565b69ce"; 

let historyArr = JSON.parse(localStorage.getItem("cities")) || [];

displayHistory();

document.getElementById("search").addEventListener("click", getWeather);

async function getWeather() {
  console.log("Start function");

  let city = document.getElementById("city").value;

  if (city === "") {
    alert("Enter city name");
    return;
  }

  try {
    console.log("Before fetch");

    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    let data = await res.json();

    console.log("After fetch");

    if (data.cod === "404") {
      document.getElementById("result").innerText = "City not found ❌";
      return;
    }

    displayData(data);

    // store in local storage
    historyArr.push(city);
    localStorage.setItem("cities", JSON.stringify(historyArr));

    displayHistory();

  } catch (err) {
    console.log(err);
    document.getElementById("result").innerText = "Error fetching data ❌";
  }
}

function displayData(data) {
  let div = document.getElementById("result");

  div.innerHTML = `
    <h2>${data.name}</h2>
    <p>Temp: ${data.main.temp} °C</p>
    <p>Weather: ${data.weather[0].main}</p>
  `;
}

function displayHistory() {
  let div = document.getElementById("history");
  div.innerHTML = "";

  historyArr.forEach(city => {
    let btn = document.createElement("button");
    btn.innerText = city;

    btn.addEventListener("click", () => {
      document.getElementById("city").value = city;
      getWeather();
    });

    div.append(btn);
  });
}
