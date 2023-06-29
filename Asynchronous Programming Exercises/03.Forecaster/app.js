function attachEvents() {
  //submit button

  document.getElementById("submit").addEventListener("click", getWeather);
  const numberation = {
    Sunny: "&#x2600", // ☀
    "Partly sunny": "&#x26C5", //⛅
    Overcast: "&#x2601", // ☁
    Rain: "&#x2614", //
    Degrees: "&#176", //°
  };
  const forecastContainer = document.getElementById("forecast");
  async function getWeather() {
    //get the weather locations (cities)
    //town
    try {
      const weatherUrl = `http://localhost:3030/jsonstore/forecaster/locations`;
      let townName = document.getElementById("location").value;
      const weatherResponse = await fetch(weatherUrl);
      const weatherData = await weatherResponse.json();

      const info = weatherData.find((x) => x.name === townName);

      createForecaster(info.code);
    } catch {
      forecastContainer.style.display = "block";
      forecastContainer.textContent = "Error";
    }
  }

  async function createForecaster(code) {
    const currentSection = document.getElementById("current");

    const upcomingContainer = document.getElementById("upcoming");
    // const foreCastSection = document.querySelector('#forecast current')

    const currentConditionUrl = `http://localhost:3030/jsonstore/forecaster/today/${code}`;
    const upcomingUrl = `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`;

    try {
      const responseCurrent = await fetch(currentConditionUrl);
      const dataCurrent = await responseCurrent.json();
      const responseUpcoming = await fetch(upcomingUrl);
      const dataUpcoming = await responseUpcoming.json();

      forecastContainer.style.display = "block";
      const todayHTMLTemp = createToday(dataCurrent);
      currentSection.appendChild(todayHTMLTemp);
      const UpcomingHTML = createUpcoming(dataUpcoming);
      upcomingContainer.appendChild(UpcomingHTML);
    } catch {
      forecastContainer.textContent = "Error";
    }
  }
  function createUpcoming(data) {
    const container = document.createElement("div");
    container.classList.add("forecast-info");
    data.forecast.forEach((data) => {
      const spanHolder = generateSpans(data);
      container.appendChild(spanHolder);
    });
    return container;
  }
  function generateSpans(data) {
    const { condition, high, low } = data;
    const spanHolder = document.createElement("span");
    spanHolder.classList.add("upcoming");
    const iconSpan = document.createElement("span");
    iconSpan.classList.add("symbol");
    iconSpan.innerHTML = numberation[condition];
    const tempSpan = document.createElement("span");
    tempSpan.classList.add("forecast-data");
    tempSpan.innerHTML = `${low}${numberation["Degrees"]}/${high}${numberation["Degrees"]}`;
    const conditionSpan = document.createElement("span");
    conditionSpan.classList.add("forecast-data");
    conditionSpan.textContent = condition;

    spanHolder.appendChild(iconSpan);
    spanHolder.appendChild(tempSpan);
    spanHolder.appendChild(conditionSpan);
    return spanHolder;
  }

  function createToday(data) {
    const { condition, high, low } = data.forecast;

    const conditionContainer = document.createElement("div");
    conditionContainer.classList.add("forecast");

    const conditionIconSpan = document.createElement("span");
    conditionIconSpan.classList.add("condition", "symbol");
    conditionIconSpan.innerHTML = numberation[condition];

    const spanContainer = document.createElement("span");
    spanContainer.classList.add("condition");

    const nameSpan = document.createElement("span");
    nameSpan.classList.add("forecast-data");
    nameSpan.textContent = data.name;

    const tempSpan = document.createElement("span");
    tempSpan.classList.add("forecast-data");
    tempSpan.innerHTML = `${low}${numberation["Degrees"]}/${high}${numberation["Degrees"]}`;

    const conditionSpan = document.createElement("span");
    conditionSpan.classList.add("forecast-data");
    conditionSpan.textContent = condition;

    conditionContainer.appendChild(conditionIconSpan);
    conditionContainer.appendChild(spanContainer);
    return conditionContainer;
  }
}

attachEvents();
