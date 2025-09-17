export interface Forecast {
  day: string;
  maxTemp: number;
  minTemp: number;
  weatherCode: number;
}

export interface HourlyForecast {
  weatherCode: number;
  time: string;
  temperature: number;
}
