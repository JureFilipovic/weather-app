function urlBuilder(location, unitsSystem) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitsSystem}&key=EH2RZAQJ49PUUGQVF5MU9EYHZ`;
  return url;
}

const apiModule = {
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
