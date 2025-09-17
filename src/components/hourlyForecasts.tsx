import { motion } from "motion/react";
import type { HourlyForecast } from "../types";
import { mapWeatherCodeToDescription } from "../utils/mapWeatherCodeToDescription";
import { formatTime } from "../utils/formatTime";
import { list, listItem } from "../utils";

type HourlyForecastProp = {
  data: HourlyForecast[];
};

const HourlyForecasts = ({ data }: HourlyForecastProp) => {
  return (
    <motion.ul
      variants={list}
      initial="hidden"
      animate="visible"
      className="space-y-4 mt-4 overflow-y-auto h-[36.5rem]"
    >
      {data.map((item, index) => (
        <motion.li
          variants={listItem}
          key={index}
          className="flex text-white items-center justify-between px-3 py-[1.125rem] bg-[#302F4A] rounded-lg"
        >
          <div className="flex gap-2 items-center">
            <img
              src={mapWeatherCodeToDescription(item.weatherCode)}
              alt="hourly weather"
              className="h-[2.5rem] w-[2.5rem]"
            />
            <span>{formatTime(item.time)}</span>
          </div>
          <span>{item.temperature}&deg;</span>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default HourlyForecasts;
