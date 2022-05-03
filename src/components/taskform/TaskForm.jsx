import React from 'react'
import "./task.styles.css"
import { useFormik } from 'formik'
import * as Yup from "yup";

export const TaskForm = () => {

  const initialValues = {
    title:"",
    status:"",
    priority:"",
    description:""
  }

  const validationSchema = () => 
    Yup.object().shape({
      title:Yup
        .string()
        .min(6, "La cantidad minima de caracteres es 6")
        .required("por fa pone el titulo"),
      status: Yup.string().required(),
      priority:Yup.string().required()
    })
  

  const onSubmit = (e) => {
    alert("Ok")
    
  }

  const formik = useFormik({initialValues, validationSchema ,onSubmit});
  
  const {handleSubmit, handleChange, errors, touched, handleBlur} = formik

  return (
    <section className='task-form'>
        <h2>Crear Tarea</h2>
        <p>Crea Tus tareas</p>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <input type="text" name="title" onChange={handleChange} onBlur={handleBlur}  placeholder="Agregue un titulo"  className={errors.title ? 'error' : ""}/>
              {errors.title && touched.title && <p className='error-message'>{errors.title}</p>}
            </div>
            <div>
              <select name="status" onChange={handleChange} onBlur={handleBlur} className={errors.status ? 'error' : ""}>
                <option value="" >Seleccionar un estado</option>
                <option value="new">Nueva</option>
                <option value="InProcess">En proceso</option>
                <option value="finished">Finalizada</option>
              </select>
              {errors.status && touched.status && <p className='error-message'>{errors.status}</p>}
            </div>
            <div>
              <select name="priority" onChange={handleChange} onBlur={handleBlur} className={errors.priority ? 'error' : ""}>
                <option value="">Seleccionar una prioridad</option>
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
              </select>
              {errors.priority && touched.priority && <p className='error-message'>{errors.priority}</p>}
            </div>
          </div>
          <div>
            <textarea name="description" onChange={handleChange} placeholder="Descripcion">

            </textarea>
          </div>
          <button type='submit'>
            crear
          </button>
        </form>
    </section>
  )
}
