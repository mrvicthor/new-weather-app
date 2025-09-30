import { useLocationStore } from "../hooks/useLocationStore";
import type { Day } from "../types";

type DaysDropDownProps = {
  daysList: Day[];
  menuRef: React.RefObject<HTMLUListElement | null>;
  itemsRef: React.RefObject<(HTMLButtonElement | null)[]>;
  handleKeyDown: (event: React.KeyboardEvent<HTMLUListElement>) => void;
};

const DaysDropDown = ({
  daysList,
  menuRef,
  itemsRef,
  handleKeyDown,
}: DaysDropDownProps) => {
  const { setSelectedDay, toggleDaysList } = useLocationStore((state) => state);

  return (
    <ul
      role="menu"
      ref={menuRef}
      id="days-menu"
      aria-labelledby="days-menu-button"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="absolute top-12 bg-[#262540] px-2 py-3 right-0 w-[11.375rem] rounded-lg z-50 border border-[#3C3B5E] shadow-lg"
    >
      {daysList.map(({ day, date }, index) => (
        <li key={index} role="none">
          <button
            role="menuitem"
            ref={(el) => {
              itemsRef.current[index] = el;
            }}
            tabIndex={-1}
            onClick={() => {
              setSelectedDay(date);
              toggleDaysList();
            }}
            className="text-white rounded-lg hover:bg-[#3C3B5E] cursor-pointer px-2 py-[0.625rem] w-full text-left"
          >
            {day}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default DaysDropDown;
