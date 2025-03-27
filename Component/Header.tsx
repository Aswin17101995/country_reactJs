import { GiHamburgerMenu } from "react-icons/gi";
import * as types from "./types";
const Header: React.FC<types.HeaderProps> = ({ handleSliderClick }) => {
  return (
    <>
      <div className="w-full px-2 bg-slate-800 text-slate-400 shadow-md p-2  sticky top-0 flex items-center">
        <div className="md:hidden mr-5 mt-2">
          <GiHamburgerMenu size={30} onClick={handleSliderClick} />
        </div>
        <div className="text-xl text-left w-auto mt-2 font-bold md:text-center md:w-full ">
          Country List
        </div>
      </div>
    </>
  );
};

export default Header;
