import clientAxios from "../config/axios";

export const useAuth = ({ middleware, url}) => {
    
    const login = async (dataValidate, setErrores) => {

        try {
            const { data } =  await clientAxios.post('/api/login', dataValidate)
            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([])
  
          } catch (error){
            setErrores(Object.values(error.response.data.errors))
        }
    }

    const register = () => {

    }

    const logout = () => {

    }

    return {
        login,
        register,
        logout
    }
}
