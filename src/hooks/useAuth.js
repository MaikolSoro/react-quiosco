import { useEffect } from 'react';
import useSWR from "swr";
import { useNavigate } from 'react-router-dom';
import clientAxios from "../config/axios";


 export const useAuth = ({ middleware, url}) => {

    const token = localStorage.getItem('AUTH_TOKEN')

    const navigate = useNavigate();

    const { data: user, error, mutate } = useSWR('/api/user', () => 
        clientAxios('/api/user', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(res => res.data)
        .catch(error => {
            throw Error(error?.response?.data?.errors)
        }) 
    );
    
    const login = async (dataValidate, setErrores) => {

        try {
            const { data } =  await clientAxios.post('/api/login', dataValidate)
            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([])
            await mutate()

          } catch (error){
            setErrores(Object.values(error.response.data.errors))
        }
    }

    const register = async (dataValidate, setErrores) => {
        try {
            const { data } = await clientAxios.post('/api/register', dataValidate);
            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([]);
            await mutate();
        } catch (error) {
            setErrores(Object.values(error.response?.data?.errors || {}));
        }
    }

    const logout = async () => {
        try {
            await clientAxios.post('/api/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            localStorage.removeItem('AUTH_TOKEN')
            await mutate(undefined)
        } catch (error) {
            throw Error(error?.response?.data?.errors)
        }
    }

    useEffect(() => {

        if(middleware === 'guest' && url && user){
            navigate(url)
        }

        if(middleware === 'guest' && user && user.admin){
            navigate('/admin');
        }

        if (middleware === 'admin' && user && !user.admin) {
            navigate('/')
        }

        if (middleware === 'auth' && error) {
            navigate('/auth/login')
        }
    }, [user, error]);


    return {
        login,
        register,
        logout,
        user,
        error
    }
}
