import { ReactNode, createContext, useState } from "react";

interface Props {
  children: ReactNode;
}

export interface Location {
  name: string;
  iso3: string;
  iso2: string;
  states: { name: string; state_code: string }[];
}

interface Context {
  location?: Location;
  setLocation?: React.Dispatch<React.SetStateAction<Location | undefined>>;
}

const defaultValue: Context = {
  location: undefined,
  setLocation: undefined,
};

export const CityContext = createContext(defaultValue);

export const CityContextProvider = ({ children }: Props) => {
  const [location, setLocation] = useState<Location>();
  const value = { location, setLocation };
  return <CityContext.Provider value={value}>{children}</CityContext.Provider>;
};
