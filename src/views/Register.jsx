import { createRef, useState } from 'react'
import { Link } from 'react-router-dom'
import clientAxios from '../config/axios'
import Alert from '../components/Alert';

export default function Register() {

  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();

  const [errores, setErrores] = useState([])

  const handleSubmit = async e => {
    e.preventDefault();

    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value

    }
      try {
        const response =  await clientAxios.post('/api/register', data)
        console.log(response)

      } catch (error){
         setErrores(Object.values(error.response.data.errors))
      }
  }
  return (
    <>
        <h1 className="text-4xl font-black"> Crea tu cuenta </h1>
        <p>Crea tu cuenta llenando el formulario</p>

        <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
          <form
            onSubmit={ handleSubmit }
            noValidate

          >
            {errores ?  errores.map((error,i) => <Alert key={i}>{ error }</Alert>): null}
            <div className="mb-4">
              <label
                  className="text-slate-800"
                  htmlFor="name"
              >
                Nombre:
              </label>
              <input 
                  type="text" 
                  id="name"
                  className="mt-2 w-full p-3 bg-gray-50"
                  name="name"
                  placeholder="Tu Nombre"
                  ref={ nameRef }
              />
            </div>

            <div className="mb-4">
              <label
                  className="text-slate-800"
                  htmlFor="email"
                  ref={ emailRef }
              >
                Email:
              </label>
              <input 
                  type="email" 
                  id="email"
                  className="mt-2 w-full p-3 bg-gray-50"
                  name="email"
                  placeholder="Tu Email"
              />
            </div>

            <div className="mb-4">
              <label
                  className="text-slate-800"
                  htmlFor="password"
              >
                Password:
              </label>
              <input 
                  type="password" 
                  id="password"
                  className="mt-2 w-full p-3 bg-gray-50"
                  name="password"
                  placeholder="Tu Password"
                  ref={ passwordRef }
              />
            </div>

            <div className="mb-4">
              <label
                  className="text-slate-800"
                  htmlFor="password confirmation"
              >
                Repetir Password:
              </label>
              <input 
                  type="password" 
                  id="password confirmation"
                  className="mt-2 w-full p-3 bg-gray-50"
                  name="password confirmation"
                  placeholder="Repetir Password"
                  ref={ passwordConfirmationRef }
              />
            </div>
            <input 
                  type="submit"
                  value="Crear Cuenta"
                  className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
            />
                
          </form>
        </div>
        <nav className="mt-5">
          <Link to="/auth/login">
            ¿Ya tienes cuenta? Inicias Sesión
          </Link>
        </nav>
    </>
     
  )
}
