import React from 'react';
import { Stack, Container, Button, Row, Col } from 'react-bootstrap';
import firebaseApp from '../credenciales';
import { getFirestore, doc, updateDoc} from 'firebase/firestore';

const firestore = getFirestore(firebaseApp);

const ListadoTarea = ({ arrayTareas, correoUsuario, setArrayTareas }) => {
    //crear nuevo array de tareas
    const eliminarTarea = async(idTareaAEliminar) => {
        const nuevoArrayTareas = arrayTareas.filter(
            (objetoTarea) => objetoTarea.id !== idTareaAEliminar
        );

        //actualizar base de tador
        const docuRef = doc(firestore, `usuarios/${correoUsuario}`);
        updateDoc(docuRef, {tareas: [...nuevoArrayTareas]});
        //actualizar useState
        setArrayTareas(nuevoArrayTareas)
    };
    

  return (
    <Container>
        <Stack>
            {
                arrayTareas.map((objetoTarea)=> {
                    return(
                        <>
                            <Row>
                                <Col>{objetoTarea.descripcion}</Col>
                                <a href={objetoTarea.url}>
                                    <Col><Button variant="dark">Ver archivo</Button></Col>
                                </a>
                                <Col><Button variant="danger" onClick={() => eliminarTarea(objetoTarea.id)}>Eliminar tarea</Button></Col>
                            </Row>
                            <hr />
                        </>
                        
                    )
                })
            }
        </Stack>
    </Container>
  )
}

export default ListadoTarea
