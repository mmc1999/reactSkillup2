//import react, { useState } from "react"
import {useFormik} from "formik"
import {Link, useNavigate} from "react-router-dom"
import "../auth.styles.css";

const Login = () => {
    //const [form, setForm] = useState(initialForm);
    const navigate = useNavigate()
    const initialValues = {
      email:"",
      password:""
    }

    const validate = (values) => {
      const errors = {}
      if(!values.email) {
        errors.email = "Error en el mail"
      } 
      if(!values.password) {
        errors.password = "error en la contraseña"
      } 
      
      return errors
    }

    const onSubmit = (e) => {
      localStorage.setItem("logged", "yes")
      navigate("/", {replace:true});
    }

    const formik = useFormik({initialValues, validate ,onSubmit});
    
    const {handleSubmit, handleChange, values, errors} = formik

    return (
      <div className="auth">
        <form onSubmit={handleSubmit}>
          <h1>Iniciar sesion</h1>
          <div>
            <label>Email</label>
            <input name="email" type="email" value={values.email} onChange={handleChange}/>
            {errors.email && <p>{errors.email}</p>}
          </div>
          <div>
            <label>Contraseña</label>
            <input type="password" name="password" value={values.password} onChange={handleChange}/>
            {errors.password && <p>{errors.password}</p>}
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