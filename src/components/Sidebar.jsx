import useQuisco from "../hooks/useQuiosco"
import Category from "./Category"


export default function Sidebar() {

  const { categories } = useQuisco()
  return (
    <aside className="md:w-72">
        <div className="p-4">
            <img 
               className="w-40"
               src="img/logo.svg"
               alt="Imagen Logo"
            />
        </div>

        <div className="mt-10">
            {categories.map( category => (
              <Category
                key={category.id} 
                category={category}
              />
            ))}
        </div>

        <div className="my-5 px-5">
            <button
                type="button"
                className="text-center bg-red-500 w-full p-3 font-bold text-white truncate"
            >
                Cancelar Orden
            </button>
        </div>
    </aside>
  )
}
