import useSWR from "swr"
import clientAxios from '../config/axios'
import Product from '../components/Product'

export default function Products() {

  const token = localStorage.getItem('AUTH_TOKEN')
  const fetcher = () => clientAxios('/api/products', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(datos => datos.data)

  const { data, error, isLoading } = useSWR('/api/products', fetcher, { refreshInterval: 10000})

  if (isLoading) return 'Cargando...'


  return (
    <div>
        <h1 className='text-4xl font-black'>Productos</h1>
        <p className='text-2xl my-10'>
            Maneja la disponibilidad desde aquí
        </p>

        <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
          {data.data.map(product => (
            <Product 
              key={product.imagen}
              product={product}
              buttonAvailable={true}
            />
          ))}
        </div>
    </div>
  )
}
