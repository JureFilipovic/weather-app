function getLocalTime(offset) {
  const now = new Date();
  const localOffsetMinutes = now.getTimezoneOffset();
  const utcMs = now.getTime() + localOffsetMinutes * 60 * 1000;
  const locationTime = new Date(utcMs + offset * 60 * 60 * 1000);
  return locationTime;
}

const dataParserModule = {
  parseData(weatherData) {
    if (!weatherData || !weatherData.days || !weatherData.days[0]) {
      throw new Error("Invalid weather data");
    }
    const localHourNow = getLocalTime(weatherData.tzoffset).getHours();

    return {
      location: weatherData.resolvedAddress,
      description: weatherData.description,
      temp: weatherData.days[0].hours[localHourNow].temp,
      tempmax: weatherData.days[0].tempmax,
      tempmin: weatherData.days[0].tempmin,
      humidity: weatherData.days[0].hours[localHourNow].humidity,
      conditions: weatherData.days[0].hours[localHourNow].conditions,
      dailyDescription: weatherData.days[0].description,
      icon: weatherData.days[0].hours[localHourNow].icon,
      sunrise: weatherData.days[0].sunrise,
      sunset: weatherData.days[0].sunset,
    };
  },
};

export default dataParserModule;
