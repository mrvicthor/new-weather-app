export const list = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // stagger delay
    },
  },
};

export const listItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const temperatureOptions = [
  {
    label: "celsius",
    value: "celsius",
  },
  {
    label: "fahrenheit",
    value: "fahrenheit",
  },
];

export const windOptions = [
  {
    label: "km/h",
    value: "km/h",
  },
  {
    label: "mph",
    value: "mph",
  },
];

export const precipitationOptions = [
  { label: "Millimeters", value: "millimeters" },
  { label: "Inches", value: "inches" },
];
