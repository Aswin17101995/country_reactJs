"use client";
import { getCountriesApi } from "../service/services";
import Card from "@/Component/Card";
import * as types from "../Component/types";
import Filter from "@/Component/Filter/Filter";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [allcountryData, setAllCountryData] =
    useState<types.CountryList | null>(null);
  const [filteredData, setFilteredData] = useState<types.CountryList | null>(
    null
  );
  const [search, setSearch] = useState("");
  const [continents, setContinets] = useState<number[]>([]);
  const [area, setArea] = useState<{ min: number | null; max: number | null }>({
    min: null,
    max: null,
  });
  const [population, setPopulation] = useState<{
    min: number | null;
    max: number | null;
  }>({ min: null, max: null });

  const getCountry = useCallback(async () => {
    const countryDatas: types.CountryList | null = await getCountriesApi();
    if (countryDatas == null) {
      throw new Error("failed");
    }
    setAllCountryData(countryDatas);
    setFilteredData(countryDatas);
  }, []);

  useEffect(() => {
    getCountry();
  }, []);

  // useEffect(() => {
  //   if (Array.isArray(allcountryData)) {
  //     let temp = [...allcountryData];
  //     if (search.length > 0) {
  //       temp = temp?.filter((itm) => {
  //         let countryName = itm.name.common;
  //         countryName = countryName.trim();
  //         countryName = countryName.split(" ").join("").toLowerCase();
  //         if (countryName.includes(search.trim().toLowerCase())) {
  //           return true;
  //         } else {
  //           return false;
  //         }
  //       });
  //       console.log(temp);
  //     }
  //     setFilteredData([...temp]);
  //   }
  // }, [search, area, population]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleChangeContinent = (id: number) => {
    console.log(id);
    let temp = [...continents];
    if (temp.includes(id)) {
      temp = temp.filter((itm) => itm != id);
    } else {
      temp.push(id);
    }
    setContinets([...temp]);
  };

  const handleChangeArea = () => {};
  const handleChangePopulation = () => {};

  useEffect(() => {
    console.log("renders");
  });

  return (
    <>
      <div className="flex max-7xl mx-auto h-screen overflow-hidden pb-2">
        <Filter
          handleSearch={handleSearch}
          handleChangeContinent={handleChangeContinent}
          handleChangeArea={handleChangeArea}
          handleChangePopulation={handleChangePopulation}
          search={search}
          continents={continents}
        />
        <div
          className="w-full md:w-5/6 h-screen overflow-y-auto my-20 max-w-7xl px-3 pb-20 md:px-10 mx-auto grid 
        grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-10 items-center
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:bg-slate-800
      [&::-webkit-scrollbar-thumb]:bg-slate-400
      [&::-webkit-scrollbar-thumb]:rounded-full
      [&::-webkit-scrollbar-thumb]:h-10
        "
        >
          {filteredData?.map((itm) => (
            <Card key={itm.name.common} itm={itm} />
          ))}
        </div>
      </div>
    </>
  );
}
