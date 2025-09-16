export const fetchLocation = async (latitude: number, longitude: number) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
  );
  if (!response.ok) {
    throw new Error(`Error fetching location details`);
  }
  const result = response.json();
  return result;
};

export const fetchWeatherDetails = async (
  latitude: number,
  longitude: number
) => {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,precipitation,relative_humidity_2m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
  );

  if (!response.ok) {
    throw new Error(`Error fetching location details`);
  }
  const result = response.json();
  return result;
};
