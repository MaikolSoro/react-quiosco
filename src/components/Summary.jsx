import { formatMoney } from '../helpers';
import useQuiosco from '../hooks/useQuiosco';
import ProductSummary from './ProductSummary';
import { useAuth } from '../hooks/useAuth';

export default function Resumen() {
  const { order, total, handleSubmitNewOrder } = useQuiosco();

  const { logout } = useAuth({});

  const checkOrder = () => order.length === 0;

  const handleSubmit = e => {
     e.preventDefault();

     handleSubmitNewOrder(logout);
  }
  return (
    <aside className="w-72 h-screen overflow-y-scroll p-5">
      <h1 className="text-4xl font-black">
        Mi pedido
      </h1>
      <p className="text-lg my-5">
        Aqui podras ver el resumen y totales de tu pedido
      </p>

      <div className="py-10">
        { order.length === 0 ? (
          <p className="text-center text-2xl">
            No hay elementos en tu pedido aún
          </p>
        ): (
          order.map(product => (
            <ProductSummary 
              key={product.id}
              product={product}
            />
          ))
        )}
      </div>

      <p className="text-xl mt-10">
        Total: {''}
        {formatMoney(total)}
      </p>
      <form 
        className="w-full"
        onSubmit={ handleSubmit }
      
      >
        <div className="mt-5">
          <input 
             type="submit"
             className={`${checkOrder() ? 'bg-indigo-100' : ' bg-indigo-600 hover:bg-indigo-800' } px-5 py-2 rounded uppercase font-bold text-white text-center w-full cursor-pointer`}
             value="Confirmar Pedido"
             disabled={checkOrder()}
          />
        </div>
      </form>
    </aside>
  )
}
