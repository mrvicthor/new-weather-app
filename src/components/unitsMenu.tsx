import { useLocationStore } from "../hooks/useLocationStore";
import type { Temperature } from "../store/location.store";
import {
  precipitationOptions,
  temperatureOptions,
  windOptions,
} from "../utils";

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
        Switch to{" "}
        {selectedUnit === "Imperial"
          ? "Metric"
          : selectedUnit === "Metric"
          ? "Imperial"
          : "Metric"}
      </button>
      <article aria-labelledby="temp-label" className="flex flex-col gap-2">
        <p id="temp-label" className="text-[#ACACB7] pl-2 capitalize">
          temperature
        </p>
        {temperatureOptions.map((item) => (
          <button
            key={item.label}
            onClick={() => setSelectedTemperature(item.value as Temperature)}
            role="menuitem"
            className={`text-white h-[2.4375rem] flex items-center justify-between w-full hover:bg-[#302F4A] cursor-pointer px-2 rounded-lg font-medium capitalize ${
              selectedTemperature === item.value && "bg-[#302F4A]"
            }`}
          >
            {item.label}
            {item.label.toLowerCase() === "celsius"
              ? " (°C)"
              : item.label.toLowerCase() === "fahrenheit"
              ? " (°F)"
              : ""}{" "}
            {selectedTemperature === item.value && (
              <img src="/assets/images/icon-checkmark.svg" alt="" />
            )}
          </button>
        ))}
      </article>
      <hr className="text-[#ACACB7] my-1" />
      <article aria-labelledby="wind-label" className="flex flex-col gap-2">
        <p id="wind-label" className="pl-2 text-[#ACACB7] capitalize ">
          wind speed
        </p>
        {windOptions.map((item) => (
          <button
            key={item.label}
            onClick={() => setSelectedWindSpeed(item.value as "km/h" | "mph")}
            role="menuitem"
            className={`text-white h-[2.4375rem] flex items-center w-full hover:bg-[#302F4A] cursor-pointer px-2 rounded-lg font-medium justify-between
            ${selectedWindSpeed === item.value && "bg-[#302F4A]"}`}
          >
            {item.label}
            {selectedWindSpeed === item.value && (
              <img src="/assets/images/icon-checkmark.svg" alt="" />
            )}
          </button>
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
          <button
            key={item.label}
            onClick={() =>
              setSelectedPrecipitation(item.value as "millimeters" | "inches")
            }
            role="menuitem"
            className={`text-white h-[2.4375rem] flex items-center justify-between w-full hover:bg-[#302F4A] cursor-pointer px-2 rounded-lg font-medium ${
              selectedPrecipitation === item.value && "bg-[#302F4A]"
            }`}
          >
            {item.label}
            {item.label.toLowerCase() === "millimeters"
              ? " (mm)"
              : item.label.toLowerCase() === "inches"
              ? " (in)"
              : ""}
            {selectedPrecipitation === item.value && (
              <img src="/assets/images/icon-checkmark.svg" alt="" />
            )}
          </button>
        ))}
      </article>
    </div>
  );
};

export default UnitsMenu;
