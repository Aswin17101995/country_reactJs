import { getCountriesApi } from "../service/services";
import Card from "@/Component/Card";
import * as types from "../Component/types";
import Filter from "@/Component/Filter/Filter";

export default async function Home() {
  const countryData: types.CountryList | null = await getCountriesApi();
  if (countryData == null) {
    throw new Error("failed");
  }
  // console.log(countryData,10)
  return (
    <>
      <div className="flex max-7xl mx-auto h-screen overflow-hidden pb-2">
        <Filter />
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
          {countryData.map((itm) => (
            <Card key={itm.name.common} itm={itm} />
          ))}
        </div>
      </div>
    </>
  );
}
