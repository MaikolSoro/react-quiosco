import { createContext, useState } from 'react'
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
        setOrder([...order, product])
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
            handleAddOrder

           }}
        >{children}
        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}

export default QuioscoContext;