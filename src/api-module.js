// Function to build the URL for the weather API based on the location and units system
function urlBuilder(location, unitsSystem) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitsSystem}&key=EH2RZAQJ49PUUGQVF5MU9EYHZ`;
  return url;
}

// apiModule object that contains methods for interacting with the weather API
const apiModule = {
  // Asynchronous method to fetch weather data for a specific location and units system
  async fetchWeatherData(location, unitsSystem) {
    const url = urlBuilder(location, unitsSystem);

    try {
      const response = await fetch(url, { mode: "cors" });
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const weatherData = await response.json();
      return weatherData;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

export default apiModule;
