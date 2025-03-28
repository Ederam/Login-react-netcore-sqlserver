import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import { useNavigate } from 'react-router-dom';

function Estudiante() {
    //Variable para la url 
    //const baseUrl = "http://localhost:5190/api/Estudiante/ListarEstudiantes";
    const baseUrl = "http://localhost:5190/api/Estudiante/";                    

    //Uso de estado
    const [data, setData] = useState([]);
    //estado para controlar cuando se abre o cierra el
    const [modalInsertar, setModalInsertar]=useState(false);
    const [modalEditar, setModalEditar]=useState(false);
    const [estudianteSeleccionado, setEstudianteSeleccionado]=useState({
        nombreCompleto: ''
    });

    //metodo para cambiar el estado del modal
    const abrirCerrarModalInsertar=()=>{
        setModalInsertar(!modalInsertar);
        peticionGet();
    }

    const abrirCerrarModalEditar=()=>{
        setModalEditar(!modalEditar);
        //peticionGet();
    }
    
    //metodo para capturar los valores
    const handleChange=e=>{
        const {name, value}=e.target;
        setEstudianteSeleccionado({
            ...estudianteSeleccionado,
            [name]: value
        });
        console.log(estudianteSeleccionado);        
    };

    const seleccionarEstudiante=(estudiante, caso)=>{
        setEstudianteSeleccionado(estudiante);
        (caso==="Editar") && 
        abrirCerrarModalEditar();
    }

    //Peticion para obtener los datos de la API
    const peticionGet=async() =>{
        await axios.get(baseUrl+'ListarEstudiantes')
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
            //cerrar el modal
            //abriCerrarModalInsertar();
        }).catch(error=>{
            console.log(error);            
        })
    }

    //Peticion Post para crear Estudiante
    const peticionPost=async() =>{
        delete estudianteSeleccionado.id_Estudiante;
        await axios.post(baseUrl,estudianteSeleccionado)
        .then(response=>{            
            setData(data.concat(response.data));     
            abrirCerrarModalInsertar();       
        }).catch(error=>{
            console.log(error);            
        })
    }

    //Peticion Put para crear Estudiante
    const peticionPut=async() =>{
        console.log(estudianteSeleccionado);
        estudianteSeleccionado.materia = "";
        estudianteSeleccionado.nombre_Profesor = "";
        await axios.put(baseUrl,estudianteSeleccionado)
        .then(response=>{            
            var respuesta = response.data;
            var dataAuxiliar = data;
            dataAuxiliar.map(estudiante=>{
                if (estudiante.id_Estudiante===estudianteSeleccionado.id_Estudiante) {
                    estudiante.nombreCompleto = estudianteSeleccionado.nombreCompleto;
                }
            })
            abrirCerrarModalEditar();       
        }).catch(error=>{
            console.log(error);            
        })
    }

    useEffect(()=>{
        peticionGet();
    },[]);

    return (
        <div className='App'>
            <br></br>
            {/* boton para abrir el modal insertar */}
            <button onClick={()=>abrirCerrarModalInsertar()} className='btn btn-primary'>Insertar Nuevo estudiante</button>
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
                                <button className='btn btn-primary' onClick={()=>seleccionarEstudiante(estudiante, "Editar")}>Editar</button>
                                <button className='btn btn-warning'>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>                
            </table>
            {/* Modal Insertar*/}
            <Modal isOpen={modalInsertar}>
                <ModalHeader>Insertar Estudiante</ModalHeader>
                <ModalBody>
                    <div className='form-group'>
                        <label>Nombre del Estudiante: </label>
                        <br />
                        <input type='text' className='form-control' name='nombreCompleto' onChange={handleChange}/>                        
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-primary' onClick={()=>peticionPost()}>Insertar</button>
                    <button className='btn btn-danger' onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
                </ModalFooter>
            </Modal>

            {/* modal editar */}
            <Modal isOpen={modalEditar}>
                <ModalHeader>Editar Estudiante</ModalHeader>
                <ModalBody>
                    <div className='form-group'>
                        <label>Código del Estudiante: </label>
                        <br />
                        <input type='text' className='form-control' name='id_Estudiante' readOnly value={estudianteSeleccionado && estudianteSeleccionado.id_Estudiante}/>                        
                        <br />
                        <label>Nombre del Estudiante: </label>
                        <br />
                        <input type='text' className='form-control' name='nombreCompleto' onChange={handleChange} value={estudianteSeleccionado && estudianteSeleccionado.nombreCompleto}/>                        
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-primary' onClick={()=>peticionPut()}>Editar</button>
                    <button className='btn btn-danger' onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
                </ModalFooter>
            </Modal>
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