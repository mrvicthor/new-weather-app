import { motion } from "motion/react";
import type { HourlyForecast } from "../types";
import { mapWeatherCodeToDescription } from "../utils/mapWeatherCodeToDescription";
import { formatTime } from "../utils/formatTime";
import { list, listItem } from "../utils";
import { useLocationStore } from "../hooks/useLocationStore";
import { formatTemperatureToFahrenheit } from "../utils/formatTemperature";

type HourlyForecastProp = {
  data: HourlyForecast[];
};

const HourlyForecasts = ({ data }: HourlyForecastProp) => {
  const { selectedTemperature } = useLocationStore((state) => state);

  return (
    <motion.ul
      variants={list}
      initial="hidden"
      animate="visible"
      className="space-y-4 mt-4 overflow-y-auto h-[36.5rem]"
    >
      {data.map((item, index) => {
        const formattedMaxTemperature = formatTemperatureToFahrenheit(
          item.temperature
        );

        const maxTemperatureToDisplay =
          selectedTemperature === "Fahrenheit"
            ? formattedMaxTemperature
            : Math.ceil(item.temperature);
        return (
          <motion.li
            variants={listItem}
            key={index}
            className="flex text-white items-center justify-between px-3 h-[3.75rem] bg-[#302F4A] rounded-lg"
          >
            <div className="flex gap-2 items-center">
              <img
                src={mapWeatherCodeToDescription(item.weatherCode)}
                alt="hourly weather"
                className="h-[2.5rem] w-[2.5rem]"
              />
              <span>{formatTime(item.time)}</span>
            </div>
            <span>{maxTemperatureToDisplay}&deg;</span>
          </motion.li>
        );
      })}
    </motion.ul>
  );
};

export default HourlyForecasts;
