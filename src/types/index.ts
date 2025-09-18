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
