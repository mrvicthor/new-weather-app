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

export type SearchResult = {
  admin1: string;
  admin1_id: number;
  country: string;
  country_code: string;
  country_id: number;
  elevation: number;
  feature_code: string;
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  population: number;
  timezone: string;
};

export type SearchResponse = {
  results: SearchResult[];
};

// Types for weather API response
export type WeatherApiResponse = {
  location: {
    address: {
      city: string;
      state: string;
      country: string;
    };
  };
  weather: {
    current: {
      time: string;
      temperature_2m: number;
      apparent_temperature: number;
      relative_humidity_2m: number;
      wind_speed_10m: number;
      precipitation: number;
      weather_code: number;
    };
    current_units: {
      relative_humidity_2m: string;
      precipitation: string;
    };
    daily: {
      time: string[];
      temperature_2m_max: number[];
      temperature_2m_min: number[];
      weather_code: number[];
    };
    hourly: {
      weather_code: number[];
      time: string[];
      temperature_2m: number[];
    };
  };
};
