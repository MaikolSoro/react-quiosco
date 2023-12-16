import { productos as data } from '../data/products'
import Product from '../components/Product'
import useQuisco from '../hooks/useQuiosco'

export default function Home() {

  const { categoryCurrent } = useQuisco()
  
  const products = data.filter(product => product.categoria_id === categoryCurrent.id)
  return (
    <>
      <h1 className='text-4xl font-black'>{ categoryCurrent.nombre }</h1>
      <p className='text-2xl my-10'>
        Elige y personaliza tu pedido a continuanción.
      </p>

      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
        {products.map(product => (
          <Product 
            key={product.imagen}
            product={product}
          />
        ))}
      </div>
    </>
  )
}
