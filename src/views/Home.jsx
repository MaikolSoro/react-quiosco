import useSWR from 'swr'
import Product from '../components/Product'
import useQuiosco from '../hooks/useQuiosco'
import clientAxios from '../config/axios'

export default function Home() {

  const { categoryCurrent } = useQuiosco()
  
  // Query SWR
  const token = localStorage.getItem('AUTH_TOKEN');
  const fetcher = () => clientAxios('/api/products', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(data => data.data)

  const { data, error, isLoading } = useSWR('/api/products', fetcher, {
    refreshInterval: 1000
  });
  
  if (isLoading) return 'Cargando..'; 
  
  const products = data.data.filter(product => product.category_id === categoryCurrent.id)
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
            buttonAdd={true}
          />
        ))}
      </div>
    </>
  )
}
