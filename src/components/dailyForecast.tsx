import { useLocationStore } from "../hooks/useLocationStore";
import type { Forecast } from "../types";
import { list, listItem } from "../utils";
import { formatTemperatureToFahrenheit } from "../utils/formatTemperature";
import { mapWeatherCodeToDescription } from "../utils/mapWeatherCodeToDescription";
import { motion } from "motion/react";

type DailyForecastProps = {
  data: Forecast[];
};
const DailyForecast = ({ data }: DailyForecastProps) => {
  const { selectedTemperature } = useLocationStore((state) => state);
  return (
    <div className="mt-5">
      <motion.ul
        variants={list}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-3 md:grid-cols-7 gap-4"
      >
        {data.map((forecast) => {
          const formattedMaxTemperature = formatTemperatureToFahrenheit(
            forecast.maxTemp
          );

          const formattedMinTemperature = formatTemperatureToFahrenheit(
            forecast.minTemp
          );

          const maxTemperatureToDisplay =
            selectedTemperature === "Fahrenheit"
              ? formattedMaxTemperature
              : Math.ceil(forecast.maxTemp);

          const minTemperatureToDisplay =
            selectedTemperature === "Fahrenheit"
              ? formattedMinTemperature
              : Math.ceil(forecast.minTemp);
          return (
            <motion.li
              variants={listItem}
              key={forecast.day}
              className="p-4 bg-[#3C3B5E] rounded-xl"
            >
              <span className="text-center block text-lg text-white font-medium">
                {forecast.day}
              </span>
              <img src={mapWeatherCodeToDescription(forecast.weatherCode)} />
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">
                  {maxTemperatureToDisplay}&deg;
                </span>
                <span className="text-white font-medium">
                  {minTemperatureToDisplay}&deg;
                </span>
              </div>
            </motion.li>
          );
        })}
      </motion.ul>
    </div>
  );
};

export default DailyForecast;
