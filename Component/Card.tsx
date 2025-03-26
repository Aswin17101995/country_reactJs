import * as types from "./types";
import Image from "next/image";
import { memo } from "react";
const Card: React.FC<types.CardProps> = ({ itm }) => {
  const formatPopulation = (population: number) => {
    return new Intl.NumberFormat("en-US").format(population);
  };
  return (
    <>
      <div
        className="bg-slate-900 hover:bg-slate-800 shadow-md max-w-xs mx-auto md:min-w-full
        hover:shadow-slate-700 hover:scale-102 duration-200 hover:-translate-y-3
          rounded-md border-slate-600 border-2 flex flex-col mb-4"
      >
        <div className="w-full md:mx-auto">
          <div className="w-75 h-50 relative  md:w-full md:rounded-t-md md:mx-auto  ">
          <Image
            className="w-75 h-50 object-fill rounded-t-md"
            src={itm.flags.png}
            alt={itm.name.common}
            fill={true}
            // quality={100}
          />
          </div>
          <div className="px-2 mt-2 ">
            <h1 className="text-slate-400 font-semibold text-2xl pb-1 border-b-1 border-slate-400">
              {itm.name.common}
            </h1>
            <div className="flex mt-2 justify-between pb-2 border-b-1 border-slate-400">
              <>
                <div>
                  <div className="text-sm font-light text-slate-400">
                    Capital
                  </div>
                  <div className="pt-1 text-md text-slate-400 font-bold">
                    {itm.capital ? itm.capital[0] : "NA"}
                  </div>
                </div>
              </>

              <div className="text-right">
                <div className="text-sm font-light text-slate-400">
                  Continent
                </div>
                <div className="pt-1 text-md text-slate-400 font-bold">
                  {itm.region}
                </div>
              </div>
            </div>
            <div
              className="flex justify-between mt-2 pb-2 border-slate-400 border-b-1
                text-md text-slate-400
                "
            >
              <div className="text-md text-slate-400">Area</div>
              <div>
                {formatPopulation(Number(itm.area))} Km<sup>2</sup>
              </div>
            </div>
            <div
              className="flex justify-between mt-2 pb-2 border-slate-400 border-b-1
                text-md text-slate-400
                "
            >
              <div className="text-md text-slate-400">Population</div>
              <div>{formatPopulation(Number(itm.population))}</div>
            </div>

            <>
              <div
                className="flex justify-between mt-2 pb-4 
                text-md text-slate-400
                "
              >
                <div className="text-md text-slate-400">TimeZone</div>
                <div>{itm.timezones ? itm.timezones[0] : "NA"}</div>
              </div>
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Card);
