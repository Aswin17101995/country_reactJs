import * as types from "./types"

const EmptyList: React.FC<types.EmptyListProps> = ({clearFilter})=>{
    return <>
    <div className="w-full h-screen flex justify-center items-center">
        <div className="w-auto px-2 rounded-md py-1 text-sm text-slate-400 bg-slate-700">
            No Countires present of this filter <span onClick={clearFilter} className="cursor-pointer hover:underline text-slate-200"> Clear Filter</span>
        </div>
    </div>
    </>
}

export default EmptyList