export const kelvinToFahrenheit = (tempInK: number): number => {
  return (tempInK - 273.15) * 1.8 + 32;
};

export const kelvinToCelsius = (tempInK: number): number => {
  return tempInK - 273.15;
};

export const metresPerSecToKmPerHour = (metresPerSec: number): number => {
  return Math.round(metresPerSec * 3.6);
};

export const metresPerSecToMilesPerHour = (metresPerSec: number): number => {
  return Math.round(metresPerSec * 2.236936);
};
