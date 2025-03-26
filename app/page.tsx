"use client";
import { getCountriesApi } from "../service/services";
import Card from "@/Component/Card";
import * as types from "../Component/types";
import Filter from "@/Component/Filter/Filter";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounce } from "@/hooks/CustomHooks";
import { memo } from "react";

export default function Home() {
  const [allcountryData, setAllCountryData] =
    useState<types.CountryList | null>(null);
  const [filteredData, setFilteredData] = useState<types.CountryList >(
    []
  );
  const [search, setSearch] = useState("");
  const { debounce, handleDebounce } = useDebounce(2000)
  const [continents, setContinets] = useState<number[]>([]);
  const [area, setArea] = useState<{ min: number | null; max: number | null }>({
    min: null,
    max: null,
  });
  const [population, setPopulation] = useState<{
    min: number | null;
    max: number | null;
  }>({ min: null, max: null });
  const [page, setPage] = useState(0)
  const [perPage,setPerPage] = useState(15)
  const [lastPage,setLastPage] = useState(0)

  const checkFilteredCount = ()=>{
    return continents.length + (debounce.length > 0 ? 1 :0)
  }

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

  const setData = ()=>{
    if(allcountryData){
      let start = (page * perPage)
      let end = (page + 1) *perPage
      setFilteredData([...filteredData,...allcountryData.slice(start,end)])
      setLastPage(Math.ceil(allcountryData.length / perPage))
    }
  }

  useEffect(()=>{
    if(checkFilteredCount() != 0){
      return
    }
    setData()
  },[allcountryData,page])

  console.log(lastPage,'LP')


  console.log(debounce,"db")

  useEffect(()=>{
    if(allcountryData){
      if(debounce.length > 0){
        let list = [...allcountryData]
        list = list.filter((itm)=> {
          let countryName = itm.name.common
          countryName = countryName.trim().split(" ").join("").toLowerCase()
          if(countryName == debounce.trim().split(" ").join("").toLowerCase()){
            return true
          }else{
            return false
          }
        })
        setFilteredData([...list])
      }else{
        setPage(0)
        setData()
      }
    }
  },[debounce,continents])

  // useEffect(()=>{
  //   handleDebounce(search)
  // },[search])

  const handleSearch = useCallback( (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  },[])

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

  const handleChangeArea = () => { };
  const handleChangePopulation = () => { };

  useEffect(() => {
    console.log("renders");
  });

  useEffect(()=>{
    handleDebounce(search)
  },[search])

  useEffect(() => {
    console.log("function prop")
  }, [handleSearch, handleChangeContinent, handleChangeArea, handleChangePopulation])

  const handlePage = ()=>{
    setPage(page +1 )
  }

  
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
          className="w-full md:w-5/6 h-screen overflow-y-auto
           my-20 max-w-7xl px-3 pb-20 md:px-10 mx-auto grid 
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
        {
          page <= lastPage && <div className="my-10 col-span-3 mx-auto rounded-md bg-slate-500 text-md px-3 py-2"
          onClick={handlePage}
          >
            Load More -{page+1}
          </div>
        }
        </div>
      </div>
    </>
  );
}
