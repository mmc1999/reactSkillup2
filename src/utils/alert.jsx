import React from 'react'
import Swal from 'sweetalert2'


export const alert = () => {
  return (
    Swal.fire({
        title:"Malas credenciales",
        text:"Por favor introduzca credenciales validas",
        confirmButtonText:"Aceptar",
        width:"400px",
        timer:10000,
        timerProgressBar: true
      })
  )
}
