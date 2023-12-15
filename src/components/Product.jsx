import { formatMoney } from "../helpers"


export default function Product({ product }) {

    const { nombre, imagen, precio } = product

  
  return (
        <div className="border p-3 shadow bg-white">
            <img 
                alt={`imagen ${nombre}`}
                className="w-full"
                src={`/img/${imagen}.jpg`}
            />

            <div className="p-5">
                <h3 className="text-2xl font-bold">
                    {nombre}
                </h3>
                <p className="mt-5 font-black text-4xl text-amber-500">{formatMoney(precio)}</p>

                <button
                    type="button"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
                >
                    Agregar
                </button>
            </div>
        </div>
  )
}
