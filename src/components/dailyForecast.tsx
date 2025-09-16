import type { Forecast } from "../types";
import { mapWeatherCodeToDescription } from "../utils";

type DailyForecastProps = {
  data: Forecast[];
};
const DailyForecast = ({ data }: DailyForecastProps) => {
  return (
    <div className="mt-5">
      <ul className="grid md:grid-cols-7 gap-4">
        {data.map((forecast) => (
          <li key={forecast.day} className="p-4 bg-[#3C3B5E] rounded-xl">
            <span className="text-center block text-lg text-white font-medium">
              {forecast.day}
            </span>
            <img src={mapWeatherCodeToDescription(forecast.weatherCode)} />
            <div className="flex justify-between items-center">
              <span className="text-white font-medium">
                {forecast.maxTemp}&deg;
              </span>
              <span className="text-white font-medium">
                {forecast.minTemp}&deg;
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DailyForecast;
