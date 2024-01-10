import { Dispatch, ReactNode, createContext, useState } from "react";

interface Props {
  children: ReactNode;
}

export interface Location {
  name: string;
  iso3?: string;
  iso2?: string;
  states?: string[];
}

export interface City {
  name: string;
}

interface Context {
  location?: Location;
  setLocation?: React.Dispatch<React.SetStateAction<Location>>;
  city?: City;
  setCity?: React.Dispatch<React.SetStateAction<City>>;
}

const defaultValue: Context = {
  location: undefined,
  setLocation: undefined,
  city: undefined,
  setCity: undefined,
};

const initialValue = {
  name: "",
  iso3: "",
  iso2: "",
  states: [],
};

export const AppContext = createContext(defaultValue);

export const AppContextProvider = ({ children }: Props) => {
  const [location, setLocation] = useState<Location>(initialValue);
  const [city, setCity] = useState<City>();
  const value = { location, setLocation, city, setCity };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
