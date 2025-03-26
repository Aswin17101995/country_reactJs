import {getCountriesApi} from "../service/services"
import Card from "@/Component/Card";
import * as types from "../Component/types"

export default async  function Home() {

 const countryData:types.CountryList | null = await getCountriesApi()
 if(countryData == null){
   throw new Error("failed")
 }
  // console.log(countryData,10)
  return (
    <>
        <div className="w-full my-20 px-3 md:px-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-10 items-center">
          {
            countryData.map((itm)=> <Card key={itm.name.common} itm={itm}/>)
          }
        </div>
    </>
  );
}
