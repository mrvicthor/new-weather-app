import { useLocationStore } from "../hooks/useLocationStore";
import type { Forecast } from "../types";
import { list, listItem } from "../utils";
import { getDisplayTemperature } from "../utils/formatTemperature";
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
        {data.map(({ maxTemp, minTemp, day, weatherCode }, index) => {
          return (
            <motion.li
              variants={listItem}
              key={day || index}
              className="p-4 bg-[#262540] rounded-xl border border-[#3C3B5E]"
            >
              <span className="text-center block text-lg text-white font-medium">
                {day}
              </span>
              <img src={mapWeatherCodeToDescription(weatherCode)} />
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">
                  {getDisplayTemperature(selectedTemperature, maxTemp)}&deg;
                </span>
                <span className="text-white font-medium">
                  {getDisplayTemperature(selectedTemperature, minTemp)}&deg;
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
