import { formatMoney } from "../helpers"
import useQuisco from "../hooks/useQuiosco"

export default function Product({ product, buttonAdd = false, buttonAvailable = false }) {


    const { handleClickModal, handleSetProduct } = useQuisco()
    const { name, image, price } = product

  
  return (
        <div className="border p-3 shadow bg-white">
            <img 
                alt={`imagen ${name}`}
                className="w-full"
                src={`/img/${image}.jpg`}
            />

            <div className="p-5">
                <h3 className="text-2xl font-bold">
                    {name}
                </h3>
                <p className="mt-5 font-black text-4xl text-amber-500">{formatMoney(price)}</p>
                { buttonAdd && (
                     <button
                        type="button"
                        className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
                        onClick={() => {
                            handleClickModal();
                            handleSetProduct(product);
                        }}
                    >
                     Agregar
                    </button>
                )}
               {buttonAvailable && (
                 <button
                    type="button"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
                    onClick={() => {}}
                >
                    Producto Agotado
                </button>
               )}
            </div>
        </div>
  )
}
