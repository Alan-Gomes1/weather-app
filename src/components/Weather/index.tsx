import "../../index.css";
import { useEffect, useRef, useState } from "react";
import search_icon from "../../assets/search.png";
import type { WeatherData } from "../../types";
import { getWeatherData } from "../../utils";
import CardBody from "../CardBody";

const Weather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();
    getWeatherData("Londres", controller.signal)
      .then((data) => {
        if (!ignore && data) {
          setWeatherData(data);
        }
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.log(error);
        }
      });

    return () => {
      ignore = true;
      controller.abort();
    };
  }, []);

  const handleSearchSubmit = async () => {
    const city = inputRef.current?.value.trim() ?? "";
    if (!city) {
      alert("Enter a city name");
      return;
    }

    try {
      const data = await getWeatherData(city);
      setWeatherData(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error);
      }
    }
  };

  return (
    <div className="weather">
      <div className="search-bar">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search"
          onKeyDown={(e) => e.key == "Enter" && handleSearchSubmit()}
        />
        <img
          src={search_icon}
          alt="ìcone de busca"
          onClick={handleSearchSubmit}
        />
      </div>
      {weatherData ? <CardBody data={weatherData} /> : <></>}
    </div>
  );
};

export default Weather;
