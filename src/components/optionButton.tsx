// Helper for conditional classNames
function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

type OptionButtonProps = {
  label: string;
  selected: boolean;
  onClick: () => void;
  unit?: string;
};

const OptionButton = ({
  label,
  selected,
  onClick,
  unit,
}: OptionButtonProps) => (
  <button
    onClick={onClick}
    role="menuitem"
    className={classNames(
      "text-white h-[2.4375rem] flex items-center justify-between w-full hover:bg-[#302F4A] cursor-pointer px-2 rounded-lg font-medium",
      selected && "bg-[#302F4A]"
    )}
  >
    <span>
      {label}
      {unit && ` (${unit})`}
    </span>
    {selected && (
      <img
        role="img"
        src="/assets/images/icon-checkmark.svg"
        alt="checkmark-icon"
      />
    )}
  </button>
);

export default OptionButton;
