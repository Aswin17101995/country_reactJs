export interface Country {
  name: Record<string, string>; // Assuming it has multiple name fields
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  idd: {
    root: string;
    suffixes: string[];
  };
  capital: string[];
  altSpellings: string[];
  region: string;
  languages: {
    [key: string]: string;
  };
  translations: Record<string, any>; // Can be refined based on structure
  latlng: [number, number];
  landlocked: boolean;
  area: number;
  demonyms: Record<string, any>; // Can be refined based on structure
  flag: Record<string, string>;
  maps: {
    googleMaps?: string;
    openStreetMaps?: string;
  };
  population: number;
  car: {
    signs?: string[];
    side: string;
  };
  timezones: string[];
  continents: string[];
  flags: {
    png: string;
    svg: string;
  };
  coatOfArms: Record<string, any>; // Can be refined if needed
  startOfWeek: string;
  capitalInfo: {
    latlng: [number, number];
  };
}

export type CountryList = Country[];

export interface CardProps {
  itm: Country;
}

export interface HeaderProps {
  handleSliderClick: () => void;
}
