import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import { useNavigate } from 'react-router-dom';

function Estudiante() {
    //Variable para la url 
    const baseUrl = "http://localhost:5190/api/Estudiante/ListarEstudiantes";

    //Uso de estado
    const [data, setData] = useState([]);

    //Peticion para obtener los datos de la API
    const peticionGet=async() =>{
        await axios.get(baseUrl)
        .then(response=>{
            let dataSim = [
                {
                    "id_Estudiante": 1,
                    "materia": "Español",
                    "nombreCompleto": "EDER CAMILO RAMIREZ",
                    "nombre_Profesor": "Angel Jimenez"
                },
                {
                    "id_Estudiante": 2,
                    "materia": "Filosofia",
                    "nombreCompleto": "PEDRO ANDRES PEREZ",
                    "nombre_Profesor": "RAUL RODRIGUEZ"
                },
            ]
            console.log(response.data);            
            setData(response.data);
            //setData(dataSim);
        }).catch(error=>{
            console.log(error);            
        })
    }

    useEffect(()=>{
        peticionGet();
    },[]);

    return (
        <div className='App'>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>id_Estudiante</th>
                        <th>nombreCompleto</th>
                        <th>materia</th>
                        <th>nombre_Profesor</th>
                        <th>Acciones</th>
                    </tr>
                </thead>                
                <tbody>
                    {data.map((estudiante, i) => (
                            <tr key={i}>
                            <td>{estudiante.id_Estudiante}</td>
                            <td>{estudiante.nombreCompleto}</td>
                            <td>{estudiante.materia}</td>
                            <td>{estudiante.nombre_Profesor}</td>
                            <td>
                                <button className='btn btn-primary'>Editar</button>
                                <button className='btn btn-warning'>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>                
            </table>
        </div>
    );

//const baseUrl="https://localhost:44391/api/usuarios";
//const cookies = new Cookies();

//let navigate = useNavigate();

// const [form, setForm]=useState({
//   username:'',
//   password: ''
// });
//   const handleChange=e=>{
//  const {name, value} = e.target;
//  setForm({
//    ...form,
//    [name]: value
//  });
//   }

//   const iniciarSesion=async()=>{
//     await axios.get(baseUrl+`/${form.username}/${md5(form.password)}`)
//     .then(response=>{
//       return response.data;
//     }).then(response=>{
//       if(response.length>0){
//         var respuesta=response[0];
//         cookies.set('id', respuesta.id, {path: '/'});
//         cookies.set('apellido_paterno', respuesta.apellido_paterno, {path: '/'});
//         cookies.set('apellido_materno', respuesta.apellido_materno, {path: '/'});
//         cookies.set('nombre', respuesta.nombre, {path: '/'});
//         cookies.set('correo', respuesta.correo, {path: '/'});
//         cookies.set('username', respuesta.username, {path: '/'});
//         cookies.set('password', respuesta.password, {path: '/'});
//         alert("Bienvenido: "+respuesta.nombre+" "+respuesta.apellido_paterno);
//         //console.log('this.props', this.props);
//         console.log('props',props);
        
//         navigate('/menu');
//         //props.history.push('/menu');
//       }else{
//         alert('El usuario o la contraseña no son correctos');
//       }
//     })
    
//     .catch(error=>{
//       console.log(error);
//     })
//   }

//   useEffect(()=>{
// if(cookies.get('id')){
//   //props.history.push('/menu');
//   navigate('/menu');
// }
//   },[]);

    // return (
    //     <div className="containerPrincipal">
    //     <div className="containerLogin">
    //       <div className="form-group">
    //         <label>Usuario: </label>
    //         <br />
    //         <input
    //           type="text"
    //           className="form-control"
    //           name="username"
    //           onChange={handleChange}
    //         />
    //         <br />
    //         <label>Contraseña: </label>
    //         <br />
    //         <input
    //           type="password"
    //           className="form-control"
    //           name="password"
    //           onChange={handleChange}
    //         />
    //         <br />
    //         <button className="btn btn-primary" onClick={()=>iniciarSesion()}>Iniciar Sesión</button>
    //       </div>
    //     </div>
    //   </div>
    // );
}

export default Estudiante;