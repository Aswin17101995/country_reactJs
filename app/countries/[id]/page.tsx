const Countries = ({params}:{params:{id:string}})=>{
    return <>
        <div>hello {params.id}</div>
    </>
}

export default Countries;