import { CityContext } from "../../contexts";
import { useContext } from "react";
const Weather = () => {
  const { location } = useContext(CityContext);
  console.log(location);
  return (
    <section className="weather-part">
      <img src="" alt="Weather Icon" />
      <div className="temp">
        <span className="numb">_</span>
        <span className="deg">°</span>C
      </div>
      <div className="weather">_ _</div>
      <div className="location">
        <i className="bx bx-map"></i>
        <span>_, _</span>
      </div>
      <div className="bottom-details">
        <div className="column feels">
          <i className="bx bxs-thermometer"></i>
          <div className="details">
            <div className="temp">
              <span className="numb-2">_</span>
              <span className="deg">°</span>C
            </div>
            <p>Feels like</p>
          </div>
        </div>
        <div className="column humidity">
          <i className="bx bxs-droplet-half"></i>
          <div className="details">
            <span>_</span>
            <p>Humidity</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Weather;
