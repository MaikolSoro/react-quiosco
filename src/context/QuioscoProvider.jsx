import { createContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import clientAxios from '../config/axios'

const QuioscoContext = createContext();

const QuioscoProvider = ({children}) => {

    const [categories, setCategories ] = useState([]);
    const [categoryCurrent, setCategoryCurrent] = useState({});
    const [modal, setModal] = useState(false);
    const [product, setProduct] = useState({});
    const [order, setOrder] = useState([])
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const newTotal = order.reduce((total, product) => (product.price * product.quantity) + total, 0)
        setTotal(newTotal)
    }, [order])

    const getCategories = async () => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {

            const { data } = await clientAxios('/api/categories', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            setCategories(data.data)
            setCategoryCurrent(data.data[0])
        } catch(error){
            console.log(error)
        }
    } 

    useEffect(() => {
        getCategories()
    }, [])
    
    const handleClickCategory = id => {
        const category = categories.filter(category => category.id === id)
       setCategoryCurrent(category[0])
    }

    const handleClickModal = () => {
        setModal(!modal)
    }

    const handleSetProduct = product => {
        setProduct(product)
    }

    const handleAddOrder = ({category_id, imagen, ...product}) => {

        if(order.some( orderState => orderState.id === product.id )){
            const orderUpdated = order.map( orderState => orderState.id === product.id ? product : orderState)
            setOrder(orderUpdated)
            toast.success('Guardado Correctamente')
        } else {
            setOrder([...order, product])
            toast.success('Agregado al pedido')
        }
    }

    const handleEditQuantity = id => {
        const productUpdate = order.filter(product => product.id === id)[0]
        setProduct(productUpdate)
        setModal(!modal);
    }

    const handleProductDeleteOrder = id => {
        const orderUpdated = order.filter(product => product.id !== id)
        setOrder(orderUpdated)
        toast.success('Eliminado del Pedido')
    }

    const handleSubmitNewOrder = async (logout) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {

             const { data } = await clientAxios.post('/api/orders', {
                total,
                products: order.map(product => {
                    return {
                        id: product.id,
                        quantity: product.quantity
                    }
                })

            },{
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            toast.success(data.message);
            setTimeout(() => {
                setOrder([])
            }, 1000);

            // Close the sesion user

            setTimeout(() => {
                localStorage.removeItem('AUTH_TOKEN');
                logout()
            }, 3000);

        } catch (error) {
            console.log(error)
        }
    }

    const handleClickfillOrder = async (id) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            await clientAxios.put(`/api/orders/${id}`, null, {
                headers: {
                    Authorization:`Bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <QuioscoContext.Provider
           value={{
            categories,
            categoryCurrent,
            handleClickCategory,
            modal,
            handleClickModal,
            product,
            handleSetProduct,
            order,
            handleAddOrder,
            handleEditQuantity,
            handleProductDeleteOrder,
            total,
            handleSubmitNewOrder,
            handleClickfillOrder

           }}
        >{children}
        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}

export default QuioscoContext;