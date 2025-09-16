export function mapWeatherCodeToDescription(code: number): string {
  let weatherImage = "";
  switch (code) {
    case 0:
      weatherImage = "/assets/images/icon-sunny.webp";
      break;
    case 1:
    case 2:
    case 3:
      weatherImage = "/assets/images/icon-partly-cloudy.webp";
      break;
    case 45:
    case 48:
      weatherImage = "/assets/images/icon-fog.webp";
      break;
    case 51:
    case 53:
    case 55:
      weatherImage = "/assets/images/icon-drizzle.webp";
      break;
    case 56:
    case 57:
      weatherImage = "/assets/images/icon-drizzle.webp";
      break;
    case 61:
    case 63:
    case 65:
      weatherImage = "/assets/images/icon-rain.webp";
      break;
    case 66:
    case 67:
      weatherImage = "/assets/images/icon-rain.webp";
      break;
    case 71:
    case 73:
    case 75:
      weatherImage = "/assets/images/icon-snow.webp";
      break;
    case 77:
      weatherImage = "/assets/images/icon-snow.webp";
      break;
    case 80:
    case 81:
    case 82:
      weatherImage = "/assets/images/icon-drizzle.webp";
      break;
    case 85:
    case 86:
      weatherImage = "/assets/images/icon-snow.webp";
      break;
    case 95:
      weatherImage = "/assets/images/icon-storm.webp";
      break;
    case 96:
    case 99:
      weatherImage = "/assets/images/icon-storm.webp";
      break;
    default:
      weatherImage = "/assets/images/icon-sunny.webp";
  }
  return weatherImage;
}
