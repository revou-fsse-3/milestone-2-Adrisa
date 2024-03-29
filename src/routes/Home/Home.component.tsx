import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext, Location } from "../../contexts";
import { ReactComponent as Magnifying } from "./../../asset/magnifying.svg";
import HomePage from "./../../pages/Home.page";
import json from "../../asset/city.list.json";

const initialSearchState = {
  countries: [],
  searchField: "",
};

const Home = () => {
  const { setLocation } = useContext(AppContext);
  const navigate = useNavigate();
  const [search, setSearch] = useState(initialSearchState);

  const handleClickLocation = (country: Location) => {
    setLocation?.(country);
    localStorage.setItem("country", country.name);
    navigate("/city");
  };

  const fetchCountries = async () => {
    try {
      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries/states"
      );
      const data = await response.json();
      const allCountries = data.data;

      setSearch((preVal) => {
        return {
          countries: allCountries,
          searchField: preVal.searchField,
        };
      });
    } catch (errors) {
      console.log(errors);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const { countries, searchField } = search;
  const [filteredCountries, setFilteredCountries] = useState(countries);

  useEffect(() => {
    const newFilteredCountries = countries.filter((country: Location) => {
      return country.name.toLocaleLowerCase().includes(searchField);
    });

    setFilteredCountries(newFilteredCountries);
  }, [countries, searchField]);

  const handleOnChange = (event: { target: { value: string } }) => {
    const newValue = event.target.value.toLocaleLowerCase();

    setSearch((prevValue) => {
      return {
        countries: prevValue.countries,
        searchField: newValue,
      };
    });
  };

  return (
    <>
      <div className="max-w-2xl mx-auto py-6">
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <Magnifying />
          </div>
          <input
            onChange={handleOnChange}
            type="search"
            id="default-search"
            className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Country"
            required
          />
        </div>
      </div>
      <div className="flex  justify-center flex-wrap gap-5">
        {filteredCountries.map((country, id) => {
          const { name, iso2 } = country;

          return (
            <div
              key={id}
              className="basis-64 bg-white font-semibold text-center rounded-3xl border shadow-lg p-10 max-w-xs"
            >
              <img
                className="mb-3 w-28 h-28 mx-auto shadow-md "
                src={`https://flagsapi.com/${iso2}/flat/64.png`}
                alt={`flag of ${name}`}
              />
              <h1 className="text-lg text-gray-700 overflow-hidden">
                {" "}
                {name}{" "}
              </h1>

              <button
                name={`${name}`}
                onClick={() => handleClickLocation(country)}
                className="bg-indigo-600 px-8 py-2 mt-8 rounded-3xl text-gray-100 font-semibold uppercase tracking-wide"
              >
                Select
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
