import appControllerModule from "./app-controller-module";
import dataParserModule from "./data-parser-module";
import getWeatherVisuals from "./visuals-module";

const domControllerModule = {
    content: document.createElement("div"),
    weatherDiv: document.createElement("div"),
    unit: "metric",
    
    async init() {
        this.content.id = "content";
        this.weatherDiv.id = "weatherDiv";
        document.body.appendChild(this.content);
        this.formLoader();
        const initialWeatherData = await appControllerModule.init();
        this.displayWeatherData(initialWeatherData);
    },

    async formLoader() {
        const formContainer = document.createElement("div");
        formContainer.className = "formContainer";

        const input = document.createElement("input");
        const searchBtn = document.createElement("button");
        searchBtn.textContent = "Search";

        const errorDiv = document.createElement("div");
        errorDiv.className = "errorDiv";
        
        searchBtn.addEventListener("click", async () => {
            const location = input.value.trim();
            if (location) {
                try {
                    const weatherData = await appControllerModule.getWeatherData(location, this.unit);
                    errorDiv.style.display = "none";
                    errorDiv.textContent = "";
                    this.displayWeatherData(weatherData);
                } catch (error) {
                    console.error("Error getting or displaying data", error);
                    errorDiv.textContent = "Location not found. Please try again.";
                    errorDiv.style.display = "block";
                }
            }
        });

        const unitToggle = document.createElement("button");
        unitToggle.className = "unitToggle";
        unitToggle.textContent = "Switch to °F";

        unitToggle.addEventListener("click", async () => {
            this.unit = this.unit === "metric" ? "us" : "metric";
            unitToggle.textContent = this.unit === "metric" ? "Switch to °F" : "Switch to °C";

            let location = input.value.trim();

            if (location === "") {
                location = "zagreb";
            }

            if (location) {
                try {
                    const weatherData = await appControllerModule.getWeatherData(location, this.unit);
                    console.log(weatherData);
                } catch (error) {
                    console.error("Error switching units", error);
                }
            }
        });

        formContainer.appendChild(unitToggle);
        formContainer.appendChild(input);
        formContainer.appendChild(searchBtn);
        formContainer.appendChild(errorDiv);
        this.content.appendChild(formContainer);
    },
    
    displayWeatherData(weatherData) {
        this.weatherDiv.innerHTML = "";
        const firstDataDIv = document.createElement("div");
        firstDataDIv.className = "firstDataDiv";
        const secondDataDiv = document.createElement("div");
        secondDataDiv.className = "secondDataDiv";
        const thirdDataDiv = document.createElement("div");
        secondDataDiv.className = "thirdDataDiv";

        const locationDiv = document.createElement("div");
        locationDiv.className = "locationDiv";
        locationDiv.textContent = `${weatherData.location}`;
        this.weatherDiv.appendChild(locationDiv);


        const { iconClass, background } = getWeatherVisuals(weatherData.icon);
        this.updateWeatherBackground(background);
        
        const icon = this.updateWeatherIcon(iconClass);

        const tempDiv = document.createElement("div");
        tempDiv.className = "tempDiv";

        const currentTemp = document.createElement("div");
        currentTemp.className = "currentTemp";
        currentTemp.textContent = `${weatherData.temp}°`;

        const tempRightDiv = document.createElement("div");
        tempRightDiv.className = "tempRightDiv";

        const tempMaxMin = document.createElement("div");
        tempMaxMin.className = "tempMinMax";
        tempMaxMin.textContent = `${weatherData.tempmax}°/${weatherData.tempmin}°`;

        const conditionsDiv = document.createElement("div");
        conditionsDiv.className = "conditionsDiv";
        conditionsDiv.textContent = `${weatherData.conditions}`;

        tempRightDiv.appendChild(tempMaxMin);
        tempRightDiv.appendChild(conditionsDiv);

        tempDiv.appendChild(currentTemp);
        tempDiv.appendChild(tempRightDiv);
        firstDataDIv.appendChild(tempDiv);
        firstDataDIv.appendChild(icon);
        this.weatherDiv.appendChild(firstDataDIv);

        const dailyDescriptionDiv = document.createElement("div");
        dailyDescriptionDiv.className = "dailyDescriptionDiv";
        dailyDescriptionDiv.textContent = `${weatherData.dailyDescription}`;

        const descriptionDiv = document.createElement("div");
        descriptionDiv.className = "descriptionDiv";
        descriptionDiv.textContent = `${weatherData.description}`;

        secondDataDiv.appendChild(dailyDescriptionDiv);
        secondDataDiv.appendChild(descriptionDiv);
        this.weatherDiv.appendChild(secondDataDiv);

        const humidityDiv = document.createElement("div");
        humidityDiv.className = "humidityDiv";
        humidityDiv.textContent = `Humidity: ${weatherData.humidity}%`;

        const sunriseDiv = document.createElement("div");
        sunriseDiv.className = "sunriseDiv";
        sunriseDiv.textContent = `Sunrise: ${formatTime(weatherData.sunrise)}`;

        const sunsetDiv = document.createElement("div");
        sunsetDiv.className = "sunsetDiv";
        sunsetDiv.textContent = `Sunset: ${formatTime(weatherData.sunset)}`;
        
        thirdDataDiv.appendChild(humidityDiv);
        thirdDataDiv.appendChild(sunriseDiv);
        thirdDataDiv.appendChild(sunsetDiv);
        this.weatherDiv.appendChild(thirdDataDiv);

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
        return icon;
    }
}

function formatTime(timeStr) {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes);

    const options = { hour: 'numeric', minute: 'numeric' };
    return date.toLocaleTimeString([], options);
}

export default domControllerModule;
