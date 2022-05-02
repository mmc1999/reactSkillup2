import {useFormik} from "formik"

const Register = () => {
    
    const initialValues = {
      userName:"",
      password:"",
      email:"",
      teamID:"",
      role:"[team leader, team member]",
      continente:"[america, europa, otro]",
      region:"[latam, brasil, america del norte, otro]"
    }

    const onSubmit = (e) => alert("puto")

    const formik = useFormik({initialValues ,onSubmit});
    
    const {handleSubmit, handleChange, values, errors} = formik

    return (
        <form onSubmit={handleSubmit}>
          <h1>Registro</h1>
          <div>
            <label>Nombre de usuario</label>
            <input name="userName" type="text" value={values.userName} onChange={handleChange}/>
            {errors.userName && <p>{errors.userName}</p>}
          </div>
          <div>
            <label>Contraseña</label>
            <input type="password" name="password" value={values.password} onChange={handleChange}/>
            {errors.password && <p>{errors.password}</p>}
          </div>
          <div>
            <label>Email</label>
            <input type="email" name="email" value={values.email} onChange={handleChange}/>
            {errors.email && <p>{errors.email}</p>}
          </div>
          <input type="hidden" name="teamID" value="" />
          {/*
          <div>
            <label>TEAM ID</label>
            <input type="text" name="teamID" value={values.teamID} onChange={handleChange}/>
            {errors.teamID && <p>{errors.teamID}</p>}
          </div>
          */}
          <div>
            <label>Role</label>
            <select 
              name="role" 
              value={values.role} 
              onChange={handleChange}
            >
              <option value="team leader">team leader</option>
              <option value="team member">team member</option>
            </select>
            {errors.role && <p>{errors.role}</p>}
          </div>
          <div>
            <label>Continente</label>
            <select 
              name="continente" 
              value={values.continente} 
              onChange={handleChange}
            >
              <option value="america">America</option>
              <option value="europa">Europa</option>
              <option value="otro">Otro</option>
            </select>
            {errors.continente && <p>{errors.continente}</p>}
          </div>
          <div>
            <label>Region</label>
            <select 
              name="region" 
              value={values.region} 
              onChange={handleChange}
            >
              <option value="latam">Latam</option>
              <option value="brasil">Brasil</option>
              <option value="america del norte">America del norte</option>
              <option value="otro">Otro</option>
            </select>
            {errors.region && <p>{errors.region}</p>}
          </div>
          <div>
            <button type="submit">Enviar</button>
          </div>
        </form>
    )
}


export default Register