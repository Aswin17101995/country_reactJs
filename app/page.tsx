"use client";
import { getCountriesApi } from "../service/services";
import Card from "@/Component/Card";
import * as types from "../Component/types";
import Filter from "@/Component/Filter/Filter";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDebounce } from "@/hooks/CustomHooks";
import { memo } from "react";
import * as JsonData from "../lib/jsonData";
import Header from "@/Component/Header";

export default function Home() {
  const [allcountryData, setAllCountryData] =
    useState<types.CountryList | null>(null);
  const [fullfilter, setFullfilter] = useState<types.CountryList>([]);
  const [filteredData, setFilteredData] = useState<types.CountryList>([]);
  const [search, setSearch] = useState("");
  const { debounce, handleDebounce } = useDebounce(0);
  const [continents, setContinets] = useState<number[]>([]);
  const [area, setArea] = useState<{ min: number | null; max: number | null }>({
    min: null,
    max: null,
  });
  const [population, setPopulation] = useState<{
    min: number | null;
    max: number | null;
  }>({ min: null, max: null });
  const [page, setPage] = useState({ value: 0 });
  const [perPage, setPerPage] = useState(15);
  const [lastPage, setLastPage] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [menu, setmenu] = useState(false);

  const checkFilteredCount = () => {
    return continents.length + (debounce.length > 0 ? 1 : 0);
  };

  const getCountry = useCallback(async () => {
    const countryDatas: types.CountryList | null = await getCountriesApi();
    if (countryDatas == null) {
      throw new Error("failed");
    }
    setAllCountryData(countryDatas);
  }, []);

  useEffect(() => {
    getCountry();
  }, []);

  const setData = (countryList: types.CountryList) => {
    if (countryList) {
      let start = page.value * perPage;
      let end = (page.value + 1) * perPage;
      let pageHandle = page.value == 0 ? [] : [...filteredData];
      setFilteredData([...pageHandle, ...countryList.slice(start, end)]);
      setLastPage(Math.ceil(countryList.length / perPage));
    }
  };

  //common effect
  console.log(lastPage);

  useEffect(() => {
    if (allcountryData) {
      let temp = [...allcountryData];
      if (debounce.length > 0) {
        temp = temp.filter((itm) => {
          if (
            itm.name.common
              .trim()
              .toLowerCase()
              .includes(debounce.trim().toLowerCase())
          ) {
            return true;
          } else {
            false;
          }
        });
      }
      if (continents.length > 0) {
        let continentNames: any[] = JsonData.Continent.filter((itm) => {
          if (continents.includes(itm.id)) {
            return true;
          } else {
            false;
          }
        });
        if (continentNames.length > 0) {
          continentNames = continentNames.map((itm) => itm.name);
        }
        temp = temp.filter((itm) => {
          let c_val = itm.continents;
          return c_val.some((itm) => continentNames.includes(itm));
        });
      }
      setPage({ value: 0 });
      if (ref && ref.current) {
        ref.current.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }
      setFullfilter(temp);
    }
  }, [debounce, continents, allcountryData]);

  useEffect(() => {
    if (fullfilter) {
      setData(fullfilter);
    }
  }, [page]);

  // useEffect(() => {
  //   if (allcountryData) {
  //     if (debounce.length > 0) {
  //       let list = [...allcountryData];
  //       list = list.filter((itm) => {
  //         let countryName = itm.name.common;
  //         countryName = countryName.trim().split(" ").join("").toLowerCase();
  //         if (
  //           countryName == debounce.trim().split(" ").join("").toLowerCase()
  //         ) {
  //           return true;
  //         } else {
  //           return false;
  //         }
  //       });
  //       setFilteredData([...list]);
  //     } else {
  //       setPage(0);
  //       setData();
  //     }
  //   }
  // }, [debounce, continents]);

  // useEffect(()=>{
  //   handleDebounce(search)
  // },[search])

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const handleChangeContinent = (id: number) => {
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
    const timer = setTimeout(() => handleDebounce(search), 500);
    return () => {
      clearInterval(timer);
    };
  }, [search]);

  const handlePage = () => {
    setPage({ value: page.value + 1 });
  };

  const handleSliderClick = () => {
    setmenu(!menu);
  };

  const CardListStyle = `w-full h-screen overflow-y-auto
                        py-10 max-w-7xl px-3 pb-20 md:px-10 mx-auto grid 
                        grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-10 items-center relative
                        [&::-webkit-scrollbar]:w-2
                        [&::-webkit-scrollbar-track]:bg-slate-800
                        [&::-webkit-scrollbar-thumb]:bg-slate-400
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        [&::-webkit-scrollbar-thumb]:h-10`;

  return (
    <>
      <div className="h-screen overflow-hidden pb-2">
        <div className="flex max-7xl mx-auto">
          <Filter
            handleSearch={handleSearch}
            handleChangeContinent={handleChangeContinent}
            handleChangeArea={handleChangeArea}
            handleChangePopulation={handleChangePopulation}
            search={search}
            continents={continents}
            menu={menu}
            handleSliderClick={handleSliderClick}
          />
          <div ref={ref} className="w-full md:w-5/6">
            <Header handleSliderClick={handleSliderClick} />
            <div className={CardListStyle}>
              {filteredData?.map((itm) => (
                <Card key={itm.name.common} itm={itm} />
              ))}
              {page.value + 1 < lastPage && (
                <div
                  className="my-10 col-span-1 md:col-span-2 lg:col-span-3 mx-auto rounded-md bg-slate-500 text-md px-3 py-2"
                  onClick={handlePage}
                >
                  Load More
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
