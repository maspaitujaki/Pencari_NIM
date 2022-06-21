export default function resultBox(props){
    return(
        <div className="flex items-center justify-between border-2 m-2 p-1 rounded-md border-slate-500 text-slate-700">
            <div className="">
              <p className="font-bold text-sm">{props.nama}</p>
              <p className=" text-sm">{props.namaJurusan}</p>   
            </div>
            <div className="">
              <p className="text-sm">{props.nimTPB}</p>
              <p className="text-sm">{props.nimJurusan}</p>
            </div>
        </div>
    )
}