import { AppContext } from "../../contexts";
import { useContext, useEffect } from "react";
import { PropCity } from "./../../contexts";
import { getItem } from "localforage";
import { useNavigate, Navigate } from "react-router-dom";
import dayjs from "dayjs";

const Weather = () => {
  const token = localStorage.getItem("state");
  const { currentCity } = useContext(AppContext);
  const cityName = currentCity?.name;
  const fetchWeather = async (curentCity: PropCity) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${curentCity}&appid=da66e1db80a12b4a568d7b697044e905`
      );
      const data = await response.json();
      const { city, list } = data;
      const cityName = city.name;
      const cityWeatherList = list;
      weatherForcastTIme(cityWeatherList);
      console.log(cityName);
    } catch (error) {
      console.log(error);
    }
  };

  const weatherForcastTIme = (listForecasts: any) => {
    listForecasts.map((listForecast: any) => {
      // const time = new Date(listForecast.dt * 1000);
      // const forecastTime = {
      //   year: time.getFullYear(),
      //   month: time.getMonth(),
      //   date: time.getDate(),
      //   day: time.getDay(),
      // };
      const time = dayjs(listForecast.dt * 1000).toISOString();

      console.log(time);
      // return forecastTime;
    });
  };

  useEffect(() => {
    fetchWeather(cityName);
  }, []);

  if (token) {
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
  }
  return <Navigate to="/" />;
};

export default Weather;
