import appControllerModule from "./app-controller-module";
import getWeatherVisuals from "./visuals-module";

const domControllerModule = {
    content: document.createElement("div"),
    weatherDiv: document.createElement("div"),
    
    async init() {
        this.content.id = "content";
        this.weatherDiv.id = "weatherDiv";
        document.body.appendChild(this.content);
        this.formLoader();
        const initialWeatherData = await appControllerModule.init();
        this.displayWeatherData(initialWeatherData);
    },

    async formLoader() {
        const input = document.createElement("input");
        const searchBtn = document.createElement("button");
        searchBtn.textContent = "Search";

        searchBtn.addEventListener("click", async () => {
            const location = input.value.trim();
            if (location) {
                try {
                    const weatherData = await appControllerModule.getWeatherData(location, "metric");
                    this.displayWeatherData(weatherData);
                } catch (error) {
                    console.error("Error getting or displaying data", error);
                }
            }
        });
        this.content.appendChild(input);
        this.content.appendChild(searchBtn);
    },

    displayWeatherData(weatherData) {
        this.weatherDiv.innerHTML = "";

        const locationDiv = document.createElement("div");
        locationDiv.className = "location-info";
        const locationText = document.createElement("h2");
        locationText.textContent = `${weatherData.location}, ${weatherData.description}`;
        locationDiv.appendChild(locationText);
        this.weatherDiv.appendChild(locationDiv);

        const currentWeatherDiv = document.createElement("div");
        currentWeatherDiv.className = "current-weather";
        const currentTitle = document.createElement("h3");
        currentTitle.textContent = "Current Weather:";
        currentWeatherDiv.appendChild(currentTitle);

        for (let key in weatherData.current) {
            const para = document.createElement("p");
            const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
            para.textContent = `${capitalizedKey}: ${weatherData.current[key]}`;
            currentWeatherDiv.appendChild(para);
        }

        this.weatherDiv.appendChild(currentWeatherDiv);

        const sunDiv = document.createElement("div");
        sunDiv.className = "sun-info";
        const sunrisePara = document.createElement("p");
        sunrisePara.textContent = `Sunrise: ${weatherData.sunrise}`;
        const sunsetPara = document.createElement("p");
        sunsetPara.textContent = `Sunset: ${weatherData.sunset}`;
        sunDiv.appendChild(sunrisePara);
        sunDiv.appendChild(sunsetPara);

        this.weatherDiv.appendChild(sunDiv);
        const { iconClass, background } = getWeatherVisuals(weatherData.current.icon);
        this.updateWeatherBackground(background);
        this.updateWeatherIcon(iconClass);
        this.content.appendChild(this.weatherDiv);
    },

    async updateWeatherBackground(backgroundKey) {
        try {
            const image = await import (`./assets/backgrounds/${backgroundKey}-background.jpg`);
            document.body.style.backgroundImage = `url(${image.default})`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
            document.body.style.backgroundRepeat = "no-repeat";
        } catch (error) {
            console.error("Failed to load background", error);
        }
    },

    updateWeatherIcon(iconClass) {
        const icon = document.createElement("i");
        icon.classList.add("wi", iconClass);
        icon.style.fontSize = "48px";
        this.weatherDiv.appendChild(icon);
    }
}

export default domControllerModule;
