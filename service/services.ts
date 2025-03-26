import * as types from "../Component/types"
export const getCountriesApi:()=> Promise<types.CountryList | null> = async()=>{
    try{
        const  response = await fetch("https://restcountries.com/v3.1/all",{method:"get"})
        let data:types.CountryList = await response.json()
        return data
    }catch(e){
        console.log(e)
        return null;
    }
}