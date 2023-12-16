import useQuisco from "../hooks/useQuiosco"


 const Category = ({ category }) => {

    const { handleClickCategory, categoryCurrent } = useQuisco();
    const {icono, id, nombre } = category

   const showCategoryCurrent = () => categoryCurrent.id === id ? 'bg-amber-400' : 'bg-white'
  return (
    <div className={`${showCategoryCurrent()} flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer`}>

        <img 
            alt="Imagen Icono"
            src={`/img/icono_${icono}.svg`}
            className="w-12"
        />

        <button 
          type="button"
          className="text-lg font-bold cursor-pointer truncate"
          onClick={() => handleClickCategory(id)}
        >
            {nombre}
        </button>
    </div>
  )
}
export default Category;
