import { categorias } from "../data/Categories" 


export default function Sidebar() {
  return (
    <div className="md:w-72">
        <div className="p-4">
            <img 
               className="w-40"
               src="img/logo.svg"
            />
        </div>

        <div className="mt-10">
            {categorias.map( category => (
                <p>{categorias.nombre}</p>
            ))}
        </div>
    </div>
  )
}
