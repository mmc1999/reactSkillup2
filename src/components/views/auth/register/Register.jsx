import {useFormik} from "formik"
import { Link } from "react-router-dom";
import "../auth.styles.css";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { FormControlLabel, Switch } from "@mui/material";
import {useNavigate} from "react-router-dom"

const { REACT_APP_API_ENDPOINT } = process.env

const Register = () => {
    const [data, setData] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      fetch(`${REACT_APP_API_ENDPOINT}auth/data`)
      .then(response => response.json())
      .then(data => setData(data.result))
    }, [])
   
    const initialValues = {
      userName:"",
      password:"",
      email:"",
      teamID:"",
      role:"",
      continent:"",
      region:"",
      switch:false
    }
    
    const handleChangeContinente = (value) => {
      setFieldValue("continent", value)
      if(value !== "America") setFieldValue("region", "Otro")
    } 

    const require = "* campo obligatorio"

    const validationSchema = () => 
      Yup.object().shape({
        userName:Yup.string().min(6, "La cantidad minima de caracteres es 6").required(require),
        password: Yup.string().required(require),
        email:Yup.string().email("Debe ser un email valido").required(require),
        //teamID:Yup.string().required(require),
        role:Yup.string().required(require),
        continent:Yup.string().required(require),
        region:Yup.string().required(require)
      })
    
    const onSubmit = (e) => {
      const teamID = !values.teamID ? uuidv4() : values.teamID;
      fetch(`${REACT_APP_API_ENDPOINT}auth/register`, {
        method:"POST",
        headers: {
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          user: {
            userName: values.userName,
            password:values.password,
            email:values.email,
            teamID: teamID,
            role: values.role,
            continent: values.continent,
            region: values.region
          }
        })
      })
      .then(response => response.json())
      .then(data => navigate("/registered/"+data.result.user.teamID))
    }

    const formik = useFormik({initialValues, validationSchema ,onSubmit});
    
    const {handleSubmit, handleChange, values, errors, touched, handleBlur,setFieldValue} = formik
    
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
          <FormControlLabel
            control={
              <Switch
                value={values.switch}
                onChange={() => formik.setFieldValue("switch", !formik.values.switch)}
                name="switch"
                color="secondary"
              />
            }
            label="Perteneces a un equipo ya creado"
          />
          {values.switch && (
              <div>
                <label>Por favor, Introduce el identifcador de equipo</label>
                <input type="text" name="teamID" value={values.teamID} onChange={handleChange} />
              </div>
          )}
          
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
              {data?.Rol?.map((el) => <option key={el} value={el}>{el}</option>)}
            </select>
            {errors.role && touched.role && <p className='error-message'>{errors.role}</p>}
          </div>
          <div>
            <label>Continente</label>
            <select 
              name="continent" 
              value={values.continent} 
              onChange={(e) => handleChangeContinente(e.currentTarget.value)}
              onBlur={handleBlur}
              className={errors.continent && touched.continent ? 'error' : ""}
            >
              <option value="">Seleccionar una opcion</option>
              {data?.continente?.map((el) => <option key={el} value={el}>{el}</option>)}
            </select>
            {errors.continent && touched.continent && <p className='error-message'>{errors.continent}</p>}
          </div>
          {
            values.continent === "America" &&
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
                  {data?.region?.map((el) => <option key={el} value={el}>{el}</option>)}
                </select>
                {errors.region && touched.region && <p className='error-message'>{errors.region}</p>}
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