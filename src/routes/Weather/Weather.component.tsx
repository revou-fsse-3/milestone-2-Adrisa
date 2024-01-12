import { AppContext } from "../../contexts";
import { useContext, useEffect, useState } from "react";
import { PropCity } from "./../../contexts";
import { getItem } from "localforage";
import { useNavigate, Navigate } from "react-router-dom";
import dayjs from "dayjs";

const Weather = () => {
  const [forcastDates, setForcastDates] = useState([]);
  const navigate = useNavigate();
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
      setForcastDates(cityWeatherList);
      console.log(cityWeatherList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWeather(cityName);
  }, []);
  const handleBack = () => {
    navigate("/");
  };
  if (token) {
    return (
      <div className="max-w-2xl mx-auto py-6">
        <button
          onClick={handleBack}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Back
        </button>
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col bg-white rounded p-4 w-full max-w-xs">
            <div className="font-bold text-xl">{cityName}</div>
            {forcastDates?.map((forecastDate: any, id) => {
              const forecastDateTag = dayjs(forecastDate.dt).format(
                "dddd, D MMMM YYYY"
              );

              return (
                <>
                  <div key={id} className="text-sm text-gray-500">
                    {forecastDateTag}
                  </div>
                  <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
                    <svg
                      className="w-32 h-32"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex flex-row items-center justify-center mt-6">
                    <div className="font-medium text-6xl">24°</div>
                    <div className="flex flex-col items-center ml-6">
                      <div>Cloudy</div>
                      <div className="mt-1">
                        <span className="text-sm">
                          <i className="far fa-long-arrow-up"></i>
                        </span>
                        <span className="text-sm font-light text-gray-500">
                          28°C
                        </span>
                      </div>
                      <div>
                        <span className="text-sm">
                          <i className="far fa-long-arrow-down"></i>
                        </span>
                        <span className="text-sm font-light text-gray-500">
                          20°C
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between mt-6">
                    <div className="flex flex-col items-center">
                      <div className="font-medium text-sm">Wind</div>
                      <div className="text-sm text-gray-500">9k/h</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="font-medium text-sm">Humidity</div>
                      <div className="text-sm text-gray-500">68%</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="font-medium text-sm">Visibility</div>
                      <div className="text-sm text-gray-500">10km</div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
  return <Navigate to="/" />;
};

export default Weather;
