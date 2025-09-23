import { useLocationStore } from "../hooks/useLocationStore";
import type { Temperature } from "../store/location.store";
import {
  precipitationOptions,
  temperatureOptions,
  windOptions,
} from "../utils";
import OptionButton from "./optionButton";

type UnitsMenuProps = {
  menuRef: React.RefObject<HTMLDivElement | null>;
};

const UnitsMenu = ({ menuRef }: UnitsMenuProps) => {
  const {
    setSelectedUnit,
    selectedUnit,
    selectedTemperature,
    setSelectedTemperature,
    selectedPrecipitation,
    setSelectedPrecipitation,
    selectedWindSpeed,
    setSelectedWindSpeed,
  } = useLocationStore((state) => state);

  return (
    <div
      ref={menuRef}
      role="menu"
      id="units-menu"
      aria-label="Units menu"
      className="absolute top-12 right-6 bg-[#262540] px-2 py-[0.375rem] w-[13.375rem] z-50 rounded-xl"
    >
      <button
        role="menuitem"
        onClick={setSelectedUnit}
        className="text-white h-[2.4375rem] flex items-center w-full hover:bg-[#302F4A] cursor-pointer px-2 rounded-lg font-medium"
      >
        Switch to {selectedUnit === "Imperial" ? "Metric" : "Imperial"}
      </button>
      <article aria-labelledby="temp-label" className="flex flex-col gap-2">
        <p id="temp-label" className="text-[#ACACB7] pl-2 capitalize">
          temperature
        </p>
        {temperatureOptions.map((item) => (
          <OptionButton
            key={item.label}
            label={item.label}
            selected={selectedTemperature === item.value}
            onClick={() => setSelectedTemperature(item.value as Temperature)}
            unit={
              item.label.toLowerCase() === "celsius"
                ? "°C"
                : item.label.toLowerCase() === "fahrenheit"
                ? "°F"
                : undefined
            }
          />
        ))}
      </article>
      <hr className="text-[#ACACB7] my-1" />
      <article aria-labelledby="wind-label" className="flex flex-col gap-2">
        <p id="wind-label" className="pl-2 text-[#ACACB7] capitalize ">
          wind speed
        </p>
        {windOptions.map((item) => (
          <OptionButton
            key={item.label}
            label={item.label}
            selected={selectedWindSpeed === item.value}
            onClick={() => setSelectedWindSpeed(item.value as "km/h" | "mph")}
          />
        ))}
      </article>
      <hr className="text-[#ACACB7] my-1" />
      <article
        aria-labelledby="precipitation-label"
        className="flex flex-col gap-2"
      >
        <p id="precipitation-label" className="text-[#ACACB7] pl-2 capitalize">
          precipitation
        </p>
        {precipitationOptions.map((item) => (
          <OptionButton
            key={item.label}
            label={item.label}
            selected={selectedPrecipitation === item.value}
            onClick={() =>
              setSelectedPrecipitation(item.value as "millimeters" | "inches")
            }
            unit={
              item.label.toLowerCase() === "millimeters"
                ? "mm"
                : item.label.toLowerCase() === "inches"
                ? "in"
                : undefined
            }
          />
        ))}
      </article>
    </div>
  );
};

export default UnitsMenu;
