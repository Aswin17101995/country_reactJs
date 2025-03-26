import { useState } from "react";

export function useDebounce(time:number){
  const [debounce,setDebounce] = useState<string>("")
  
  console.log(debounce,"dbs")
  const handleDebounce = (value:string)=>{
    console.log("db called")
    setTimeout(()=>{
        setDebounce(value)
    },time)
  }
  return {debounce,handleDebounce}
}