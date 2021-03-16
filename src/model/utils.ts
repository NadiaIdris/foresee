export const convertKelvinToFahrenheit = (tempInK: number) => {
  return (tempInK - 273.15) * 1.8 + 32;
};

export const convertKelvinToCelsius = (tempInK: number) => {
  return tempInK - 273.15;
};
