import { Waves, Wind } from "lucide-react";
import type { WeatherData } from "../../types";

type CardBodyProps = {
  data: WeatherData;
};

const CardBody = ({ data }: CardBodyProps) => {
  return (
    <>
      <img src={data.icon} alt="ícone do clima" className="weather-icon" />
      <p className="temperature">{data.temperature}°c</p>
      <p className="location">{data.location}</p>
      <div className="weather-data">
        <div className="col">
          <Waves />
          <div>
            <p>{data.humidity} %</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <Wind />
          <div>
            <p>{data.windSpeed} Km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardBody;
