import { productos } from '../data/products'
import Product from '../components/Product'

export default function Home() {

  return (
    <>
      <h1 className='text-4xl font-back'>Inicio</h1>
      <p className='text-2xl my-10'>
        Elige y personaliza tu pedido a continuanción.
      </p>

      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
        {productos.map(product => (
          <Product 
            key={product.imagen}
            product={product}
          />
        ))}
      </div>
    </>
  )
}
