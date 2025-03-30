import Loading from "./Loading";
import Card from "./Card";
import * as types from "./types"
import EmptyList from "./EmptyList";
const CardListWrapper:React.FC<types.CardListWrapperProps> = ({loading,filteredData,refProp,page,lastPage,handlePage,cardListStyle,clearFilter}) => {
    if(loading){
      return <Loading/>
    }
    if(filteredData.length == 0 && loading == false){
        return <EmptyList clearFilter={clearFilter}/>
    }
    return <>
      < div ref={refProp} className={cardListStyle}>
        {filteredData.length > 0 && <>
          {filteredData?.map((itm) => (
            <Card key={itm.name.common} itm={itm} />
          ))}
        </> }
        {page.value + 1 < lastPage && (
          <div
            className="my-10 col-span-1 md:col-span-2 lg:col-span-3 mx-auto rounded-md bg-slate-500 text-md px-3 py-2"
            onClick={handlePage}
          >
            Load More
          </div>
        )}
      </div>
    </>
  }

export default CardListWrapper;