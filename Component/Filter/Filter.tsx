"use client";
import * as data from "../../lib/jsonData";
import AreaSlider from "./AreaSlider";
import * as types from "./types";
import { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";

const Filter: React.FC<types.FilterProps> = ({
  handleSearch,
  handleChangeContinent,
  handleChangeArea,
  handleChangePopulation,
  search,
  continents,
  menu,
  handleSliderClick,
  clearFilter
}) => {
  const [filterStyle, setFilterStyle] = useState("hidden md:w-1/6");

  useEffect(() => {
    if (menu) {
      setFilterStyle("absolute left-0 top-0");
    } else {
      setFilterStyle("hidden md:w-1/6");
    }
    return () => {
      setFilterStyle("hidden md:w-1/6");
    };
  }, [menu]);
  const scrollStyle = ` [&::-webkit-scrollbar]:w-1
                        [&::-webkit-scrollbar-track]:bg-slate-800
                        [&::-webkit-scrollbar-thumb]:bg-slate-400
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        [&::-webkit-scrollbar-thumb]:h-4`;
  return (
    <>
      <div
        style={
          menu
            ? {
                left: 0,
                top: 0,
                width: "85%",
              }
            : {}
        }
        className={`z-100 absolute -left-100 md:left-0 md:relative transition-all md:w-1/6 md:block p-2 pb-10 text-slate-400   bg-slate-800 shadow-md duration-100 h-screen overflow-y-scroll ${scrollStyle}`}
      >
        <div className="mt-2 text-xl font-semibold flex justify-between items-center">
          <div>Filters</div>
          <div className="flex items-center">
           <div className="px-2 py-1 bg-slate-700 text-sm cursor-pointer rounded-md text-slate-500 mr-2"
           onClick={clearFilter}
           >Clear</div>
          {menu && (
            <div className="md:hidden">
              <IoMdCloseCircle size={20} onClick={handleSliderClick} />
            </div>
          )}
          </div>
        </div>
        <div className="mt-2">
          <label
            hidden
            htmlFor="searchCountry"
            className="my-2 block text-sm font-light"
          >
            Search
          </label>
          <input
            type="text"
            name="searchCountry"
            id="searchCountry"
            value={search}
            onChange={handleSearch}
            placeholder="Search Country"
            className="p-2 focus:outline-none text-center w-full text-slate-400 placeholder:text-slate-600 rounded-md border-1 border-slate-600"
          ></input>
        </div>
        <div className="mt-2 pb-2 border-b-1 border-slate-400">
          <div className="text-md font-semibold mb-2">Continents</div>
          <form>
            {data.Continent.map((itm) => (
              <div key={itm.id} className="text-md font-light mb-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    readOnly
                    name={itm.id.toString()}
                    id={itm.id.toString()}
                    className="hidden peer"
                    checked={continents.includes(itm.id) ? true : false}
                    onClick={() => {
                      handleChangeContinent(itm.id);
                    }}
                  />
                  <div
                    onClick={() => {
                      handleChangeContinent(itm.id);
                    }}
                    className="w-4 h-4 cursor-pointer bg-slate-900 peer-checked:bg-slate-300 rounded-full border-slate-800 text-slate-400"
                  ></div>
                  <label
                    htmlFor={itm.id.toString()}
                    className="pl-2 cursor-pointer"
                  >
                    {itm.name}
                  </label>
                </div>
              </div>
            ))}
          </form>
        </div>
        {/* <div className="mt-2 pb-4 border-b-1 border-slate-400">
          <div className="text-md font-semibold mb-5">Area</div>
          <div className="mx-3">
            <AreaSlider />
          </div>
        </div>
        <div className="mt-2 ">
          <div className="text-md font-semibold mb-5">Population</div>
          <div className="mx-3">
            <AreaSlider />
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Filter;
