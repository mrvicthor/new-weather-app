import type { Forecast } from "../types";
import { list, listItem } from "../utils";
import { mapWeatherCodeToDescription } from "../utils/mapWeatherCodeToDescription";
import { motion } from "motion/react";

type DailyForecastProps = {
  data: Forecast[];
};
const DailyForecast = ({ data }: DailyForecastProps) => {
  return (
    <div className="mt-5">
      <motion.ul
        variants={list}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-3 md:grid-cols-7 gap-4"
      >
        {data.map((forecast) => (
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
                {forecast.maxTemp}&deg;
              </span>
              <span className="text-white font-medium">
                {forecast.minTemp}&deg;
              </span>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export default DailyForecast;
