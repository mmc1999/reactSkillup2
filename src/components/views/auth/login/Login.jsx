//import react, { useState } from "react"
import {useFormik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import "../auth.styles.css";
import * as Yup from "yup";

const { REACT_APP_API_ENDPOINT } = process.env

const Login = () => {
    //const [form, setForm] = useState(initialForm);
    const navigate = useNavigate()
    const initialValues = {
      userName:"",
      password:""
    }

    const require = "* campo obligatorio"

    const validationSchema = () => 
      Yup.object().shape({
        userName:Yup.string().min(6, "La cantidad minima de caracteres es 6").required(require),
        password: Yup.string().required(require),
      })
    
      const onSubmit = (e) => {
        fetch(`${REACT_APP_API_ENDPOINT}auth/login`, {
          method:"POST",
          headers: {
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            user: {
              userName: values.userName,
              password:values.password,
            }
          })
        })
        .then(response => response.json())
        .then(data => {
          navigate("/", {replace:true})
          localStorage.setItem("logged", data?.result?.token)
        })
      }


    const formik = useFormik({initialValues, validationSchema ,onSubmit});
    
    const {handleSubmit, handleChange, values, errors, touched, handleBlur} = formik

    return (
      <div className="auth">
        <form onSubmit={handleSubmit}>
          <h1>Iniciar sesion</h1>
          <div>
            <label>UserName</label>
            <input type="text" name="userName"  value={values.userName} onChange={handleChange} onBlur={handleBlur} />
            {errors.userName && touched.userName && <p className='error-message'>{errors.userName}</p>}
          </div>
          <div>
            <label>Contraseña</label>
            <input type="password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
            {errors.password && touched.password && <p className='error-message'>{errors.password}</p>}
          </div>
          <div>
            <button type="submit">Enviar</button>
          </div>
          <div>
            <Link to="/register" >
              Registrarme
            </Link>
          </div>
        </form>
      </div>
    )
}


export default Login