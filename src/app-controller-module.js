import dataParserModule from "./data-parser-module";
import apiModule from "./api-module";

const appControllerModule = {
    async init() {
        const data = await this.getWeatherData("zagreb", "metric");
        return data;
    },

    async getWeatherData(location, unitsSystem) {
        try {
            const apiData = await apiModule.fetchWeatherData(location, unitsSystem);
            const weatherData = dataParserModule.parseData(apiData);
            return weatherData;
        } catch (error) {
            console.error("Error fetching or parsing weather data:", error);
            throw error;
        }
    },

    // async consoleLogInfo(location, unitsSystem) {
    //     try {
    //         const weatherData = await this.getWeatherData(location, unitsSystem);
    //         for (let key in weatherData) {
    //             console.log(key, weatherData[key]);
    //         }
    //     } catch (error) {
    //         console.error("Error initializing app:", error)
    //     }
    // }
}; 

export default appControllerModule;