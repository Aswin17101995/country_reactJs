export interface FilterProps {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeContinent: (id: number) => void;
  handleChangeArea: () => void;
  handleChangePopulation: () => void;
  search: string;
  continents: number[];
  menu: boolean;
  handleSliderClick: () => void;
}
