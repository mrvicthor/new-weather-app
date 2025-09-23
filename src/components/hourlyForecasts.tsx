import { motion } from "motion/react";
import type { HourlyForecast } from "../types";
import { mapWeatherCodeToDescription } from "../utils/mapWeatherCodeToDescription";
import { formatTime } from "../utils/formatTime";
import { list, listItem } from "../utils";
import { useLocationStore } from "../hooks/useLocationStore";
import { getDisplayTemperature } from "../utils/formatTemperature";

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
      {data.map(({ time, temperature, weatherCode }, idx) => (
        <motion.li
          variants={listItem}
          key={time || idx}
          className="flex text-white items-center justify-between px-3 h-[3.75rem] bg-[#302F4A] rounded-lg border border-[#3C3B5E]"
        >
          <div className="flex gap-2 items-center">
            <img
              src={mapWeatherCodeToDescription(weatherCode)}
              alt="hourly weather"
              className="h-[2.5rem] w-[2.5rem]"
            />
            <span>{formatTime(time)}</span>
          </div>
          <span>
            {getDisplayTemperature(selectedTemperature, temperature)}&deg;
          </span>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default HourlyForecasts;
