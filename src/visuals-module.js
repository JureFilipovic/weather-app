const iconMapper = {
  "clear-day": {
    icon: "wi-day-sunny",
    background: "clear",
  },
  "clear-night": {
    icon: "wi-night-clear",
    background: "clear",
  },
  "partly-cloudy-day": {
    icon: "wi-day-cloudy",
    background: "cloudy",
  },
  "partly-cloudy-night": {
    icon: "wi-night-alt-cloudy",
    background: "cloudy",
  },
  cloudy: {
    icon: "wi-cloudy",
    background: "cloudy",
  },
  wind: {
    icon: "wi-strong-wind",
    background: "wind",
  },
  fog: {
    icon: "wi-fog",
    background: "fog",
  },
  rain: {
    icon: "wi-rain",
    background: "rain",
  },
  snow: {
    icon: "wi-snow",
    background: "snow",
  },
};

export default function getWeatherVisuals(apiIconName) {
  const visuals = iconMapper[apiIconName];
  return {
    iconClass: visuals?.icon || "wi-na",
    background: visuals?.background || "default",
  };
}
