import {useFormik} from "formik"
import { Link } from "react-router-dom";
import "../auth.styles.css";
import * as Yup from "yup";
import { useEffect, useState } from "react";


const Register = () => {
    const [data, setData] = useState("")  
    useEffect(() => {
      fetch("https://goscrum-api.alkemy.org/auth/data")
      .then(response => response.json())
      .then(data => setData(data.result))
    }, [])
    
    console.log(data)

    const initialValues = {
      userName:"",
      password:"",
      email:"",
      //teamID:"",
      role:"",
      continente:"",
      region:""
    }

    const require = "* campo obligatorio"

    const validationSchema = () => 
      Yup.object().shape({
        userName:Yup.string().min(6, "La cantidad minima de caracteres es 6").required(require),
        password: Yup.string().required(require),
        email:Yup.string().email("Debe ser un email valido").required(require),
        //teamID:Yup.string().required(require),
        role:Yup.string().required(require),
        continente:Yup.string().required(require),
        region:Yup.string().required(require)
      })
    
    const onSubmit = (e) => alert("puto")

    const formik = useFormik({initialValues, validationSchema ,onSubmit});
    
    const {handleSubmit, handleChange, values, errors, touched, handleBlur} = formik

    return (
      <div className="auth">
        <form onSubmit={handleSubmit}>
          <h1>Registro</h1>
          <div>
            <label>Nombre de usuario</label>
            <input name="userName" type="text" value={values.userName} onChange={handleChange} className={errors.userName && touched.userName ? 'error' : ""} onBlur={handleBlur} />
            {errors.userName && touched.userName && <p className='error-message'>{errors.userName}</p>}
          </div>
          <div>
            <label>Contraseña</label>
            <input type="password" name="password" value={values.password} onChange={handleChange} className={errors.password && touched.password ? 'error' : ""} onBlur={handleBlur}/>
            {errors.password && touched.password && <p className='error-message'>{errors.password}</p>}
          </div>
          <div>
            <label>Email</label>
            <input type="email" name="email" value={values.email} onChange={handleChange} className={errors.email && touched.email ? 'error' : ""} onBlur={handleBlur}/>
            {errors.email && touched.email && <p className='error-message'>{errors.email}</p>}
          </div>
          <input type="hidden" name="teamID" value="" />
          {/*<div>
            <label>TEAM ID</label>
            <input type="text" name="teamID" value={values.teamID} onChange={handleChange}/>
            {errors.teamID && touched.teamID && <p className='error-message'>{errors.teamID}</p>}
          </div>*/}
          <div>
            <label>Rol</label>
            <select 
              name="role" 
              value={values.role} 
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.role && touched.role ? 'error' : ""}
            >
              <option value="">Seleccionar una opcion</option>
              {data.Rol.map((el) => <option key={el} value={el}>{el}</option>)}
            </select>
            {errors.role && <p className='error-message'>{errors.role}</p>}
          </div>
          <div>
            <label>Continente</label>
            <select 
              name="continente" 
              value={values.continente} 
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.continente && touched.continente ? 'error' : ""}
            >
              <option value="">Seleccionar una opcion</option>
              {data.continente.map((el) => <option key={el} value={el}>{el}</option>)}
            </select>
            {errors.continente && <p className='error-message'>{errors.continente}</p>}
          </div>
          {
            values.continente === "America" &&
              <div>
                <label>Region</label>
                <select 
                  name="region" 
                  value={values.region} 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.region && touched.region ? 'error' : ""}
                >
                  <option value="">Seleccionar una opcion</option>
                  {data.region.map((el) => <option key={el} value={el}>{el}</option>)}
                </select>
                {errors.region && <p className='error-message'>{errors.region}</p>}
              </div>
          }
          <div>
            <button type="submit">Enviar</button>
          </div>
          <div>
            <Link to="/login" >
              Iniciar sesion
            </Link>
          </div>
        </form>
      </div>
    )
}


export default Register