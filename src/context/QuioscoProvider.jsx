import { createContext, useState } from 'react'
import { toast } from 'react-toastify';
import { categories as categoriesDB } from '../data/categories'

const QuioscoContext = createContext();

const QuioscoProvider = ({children}) => {

    const [categories, setCategories ] = useState(categoriesDB);
    const [categoryCurrent, setCategoryCurrent] = useState(categories[0]);
    const [modal, setModal] = useState(false);
    const [product, setProduct] = useState({});
    const [order, setOrder] = useState([])

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
            handleProductDeleteOrder

           }}
        >{children}
        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}

export default QuioscoContext;