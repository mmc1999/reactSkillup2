//import react, { useState } from "react"
import {useFormik} from "formik"
import {useNavigate} from "react-router-dom"
import "./login.styles.css";

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
        </form>
      </div>
    )
}


export default Login