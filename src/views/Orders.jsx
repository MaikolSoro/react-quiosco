import useSWR from "swr"

import clientAxios from "../config/axios"

export default function Orders () {
    const token = localStorage.getItem('AUTH_TOKEN')
    const fetcher = () => clientAxios('/api/orders', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    const { data, error, isLoading  } = useSWR('/api/orders', fetcher)

    if(isLoading) return 'Cargando...'

    console.log(data.data.data)

  return (
    <div>
        <h1 className='text-4xl font-black'>Ordenes</h1>
        <p className='text-2xl my-10'>
           Administra las ordenes desde aquí.
        </p>

        <div>
            {data.data.data.map(order => (
                <div key={order.id} className="p-5 bg-white shadow space-y-2 border-b">

                    <p className='text-xl font-bold text-slate-600'>
                        Contenido del Pedido:
                    </p>
                    {order.products.map(product => (
                        <div 
                            key={product.id}
                            className='border-b border-b-slate-200 last-of-type:border-none py-4'
                        >   
                            <p className='text-sm'>ID: {product.id}</p>
                            <p>ID:{product.name}</p>

                            <p>
                                Cantidad: {''}
                                <span className='font-bold'>{product.pivot.quantity}</span>
                            </p>

                        </div>
                    ))}
                </div>
            ))}
        </div>
    </div>
  )
}
