const CityFormatter = (city) => {
  let cityFormatted = city
    .split("/")
    .slice(1, 2)
    .join(" ")
    .split("_")
    .join(" ");

  return cityFormatted;
};

export default CityFormatter;
