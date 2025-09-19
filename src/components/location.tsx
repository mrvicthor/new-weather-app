import { mapWeatherCodeToDescription } from "../utils/mapWeatherCodeToDescription";

type LocationProps = {
  city: string;
  state: string;
  date: string;
  country: string;
  weatherCode: number;
  temperature: number;
};

const Location = ({
  city,
  state,
  country,
  date,
  weatherCode,
  temperature,
}: LocationProps) => {
  return (
    <div className="bg-[url('/assets/images/bg-today-small.svg')] md:bg-[url('/assets/images/bg-today-large.svg')] h-[17.875rem] bg-cover bg-center bg-no-repeat rounded-[1.25rem] flex flex-col justify-center md:flex-row items-center px-6">
      <div className="md:flex-1">
        <h2 className="font-sans text-[1.75rem] font-bold text-white">
          {city ?? state}, {country}
        </h2>
        <p className="text-[1.125rem] font-medium opacity:80 text-white mt-3">
          {date}
        </p>
      </div>
      <div className="flex items-center">
        <img
          src={mapWeatherCodeToDescription(weatherCode)}
          className="h-[7.5rem] w-[7.5rem]"
        />
        <p className="text-white italic text-[6rem] font-bold">
          {Math.ceil(temperature)}&deg;
        </p>
      </div>
    </div>
  );
};

export default Location;
