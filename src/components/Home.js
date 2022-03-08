import React, { useState, useEffect } from 'react';
import firebaseApp from '../credenciales';
import { Container, Button } from 'react-bootstrap';
import { getAuth, signOut} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';
import AgregarTarea from './AgregarTarea';
import ListadoTarea from './ListadoTarea';

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const Home = ({correoUsuario}) => {

    const fakeData = [
        {id:1, descripcion:'tarea falsa 1', url:'https://picsum.photos/420'},
        {id:2, descripcion:'tarea falsa 2', url:'https://picsum.photos/420'},
        {id:3, descripcion:'tarea falsa 3', url:'https://picsum.photos/420'}
    ]

    const [arrayTareas, setArrayTareas] = useState(null);

    const buscarDocumentoOrCrearDocumento = async(idDocumento) => {
            //Crear referencia al documento
            const docuRef = doc(firestore, `usuarios/${idDocumento}`);
            console.log(idDocumento)
            //buscar documento
            const consulta = await getDoc(docuRef);
            //revisar si existe
            if (consulta.exists()) {
                //existe
                const infoDocu = consulta.data();
                return infoDocu.tareas
            } else {               
            //no existe
            await setDoc(docuRef, { tareas: [...fakeData]});
            const consulta = await getDoc(docuRef);
            const infoDocu = consulta.data();
            return infoDocu.tareas
            }
            
            


    }

    useEffect(() => {
        const fetchTareas = async() => {
            const tareasFetchadas = await buscarDocumentoOrCrearDocumento(correoUsuario)
            setArrayTareas(tareasFetchadas);
        }
        fetchTareas();
    },[]);

  return (
    <Container>
       <h4>home, la sesión ha sido iniciada...</h4>
       <Button onClick={() => signOut(auth)}>
            cerrar sesión
       </Button>
       <hr />
       <AgregarTarea arrayTareas={arrayTareas} setArrayTareas={setArrayTareas} correoUsuario={correoUsuario}/>
       {
           arrayTareas &&
           <ListadoTarea arrayTareas={arrayTareas} setArrayTareas={setArrayTareas} correoUsuario={correoUsuario}/>
       }
       

    </Container>
  )
}

export default Home
