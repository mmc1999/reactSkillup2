import React from 'react'
import "./task.styles.css"
import { useFormik } from 'formik'
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { REACT_APP_API_ENDPOINT } = process.env

export const TaskForm = () => {
  const navigate = useNavigate()

  const initialValues = {
    title:"",
    status:"",
    importance:"",
    description:""
  }

  const validationSchema = () => 
    Yup.object().shape({
      title:Yup
        .string()
        .min(6, "La cantidad minima de caracteres es 6")
        .required("por fa pone el titulo"),
      status: Yup.string().required(),
      importance:Yup.string().required(),
      description: Yup.string().required()
    })
  

    const onSubmit = (e) => {
      console.log(values)
      fetch(`${REACT_APP_API_ENDPOINT}task`, {
        method:"POST",
        headers: {
          "Content-Type":"application/json",
          "Authorization":"Bearer "+ localStorage.getItem("logged")
        },
        body:JSON.stringify({
          task: values
        })
      })
      .then(response => response.json())
      .then(data => {
        resetForm()
        toast("tu tarea se creo!")
      })
    }


  const formik = useFormik({initialValues, validationSchema ,onSubmit});
  
  const {handleSubmit, handleChange, values, errors, touched, handleBlur, resetForm} = formik

  return (
    <section className='task-form'>
        <h2>Crear Tarea</h2>
        <p>Crea Tus tareas</p>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <input 
                type="text" 
                name="title" 
                onChange={handleChange} 
                onBlur={handleBlur}  
                placeholder="Agregue un titulo"  
                className={errors.title && touched.title ? 'error' : ""} 
                value={values.title}
              />
              {errors.title && touched.title && <p className='error-message'>{errors.title}</p>}
            </div>
            <div>
              <select 
                name="status" 
                onChange={handleChange} 
                onBlur={handleBlur} 
                className={errors.status && touched.status ? 'error' : ""} 
                value={values.status}
              >
                <option value="" >Seleccionar un estado</option>
                <option value="NEW">Nueva</option>
                <option value="IN PROGRESS">En proceso</option>
                <option value="FINISHED">Finalizada</option>
              </select>
              {errors.status && touched.status && <p className='error-message'>{errors.status}</p>}
            </div>
            <div>
              <select 
                name="importance" 
                onChange={handleChange} 
                onBlur={handleBlur} 
                className={errors.importance && touched.importance ? 'error' : ""} 
                value={values.importance}
              >
                <option value="">Seleccionar una prioridad</option>
                <option value="LOW">Baja</option>
                <option value="MEDIUM">Media</option>
                <option value="HIGH">Alta</option>
              </select>
              {errors.importance && touched.importance && <p className='error-message'>{errors.importance}</p>}
            </div>
          </div>
          <div>
            <textarea 
              name="description" 
              onChange={handleChange} 
              placeholder="Descripcion"
              onBlur={handleBlur} 
              className={errors.description && touched.description ? 'error' : ""}
              value={values.description}
            />
            {errors.description && touched.description && <p className='error-message'>{errors.description}</p>}
          </div>
          <button type='submit'>
            crear
          </button>
        </form>
        <ToastContainer />
    </section>
  )
}
