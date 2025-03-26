import * as data from "../../lib/jsonData";
import AreaSlider from "./AreaSlider";
const Filter = () => {
  return (
    <>
      <div className="md:w-1/6 p-2 text-slate-400 -translate-x-300 w-0 md:translate-x-0 bg-slate-800 shadow-md duration-100 md: h-screen">
        <div className="mt-2 text-xl font-semibold">Filters</div>
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
                    name={itm.id.toString()}
                    id={itm.id.toString()}
                    className="hidden peer"
                  />
                  <div className="w-4 h-4 bg-slate-900 peer-checked:bg-slate-300 rounded-full border-slate-800 text-slate-400"></div>
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
        <div className="mt-2 pb-4 border-b-1 border-slate-400">
          <div className="text-md font-semibold mb-5">Area</div>
          <div className="mx-3">
            <AreaSlider />
          </div>
        </div>
        <div className="mt-8 ">
          <div className="text-md font-semibold mb-5">Population</div>
          <div className="mx-3">
            <AreaSlider />
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
