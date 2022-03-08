import React from 'react';
import { Container, Form, Col, Row, Button } from 'react-bootstrap';
import firebaseApp from '../credenciales';
import { getFirestore, updateDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const AgregarTarea = ({ arrayTareas, correoUsuario, setArrayTareas }) => {

  let urlDescarga;

  async function addTarea(e) {
    e.preventDefault();
    const descripcion = e.target.formDescripcion.value;
    //crear nuevo array de tareas
    const nuevoArrayTareas = [...arrayTareas, {id: + new Date(), descripcion: descripcion , url: urlDescarga }]
    //actualizar base de datos
    const docuRef = doc(firestore, `usuarios/${correoUsuario}`);
    updateDoc(docuRef, {tareas: [...nuevoArrayTareas]});
    //actualizar estaRegistrandose
    setArrayTareas(nuevoArrayTareas);
    //limpiar form
    e.target.formDescripcion.value = '';
  }

  async function handleFile (e) {
    e.preventDefault();
      //detectar archivo
      const archivoLocal = e.target.files[0];
      //cargarlo en firebase storage
      const archivoRef = ref(storage, `documentos/${archivoLocal.name}`);
      console.log(archivoLocal.name)
      await uploadBytes(archivoRef, archivoLocal);
      //obtener url de descarga
      urlDescarga = await getDownloadURL(archivoRef);
  }


  return (
    <Container>
        <Form onSubmit={addTarea}>
            <Row>
                <Col>
                    <Form.Control type="text" placeholder="Describe tu tarea" id="formDescripcion"/>
                </Col>
                <Col>
                    <Form.Control type="file" placeholder="añade archivo" onChange={handleFile} />
                </Col>
                <Col>
                    <Button type="submit">Agregar tarea</Button>
                </Col>
            </Row>
            <hr />
        </Form>
    </Container>
  )
}

export default AgregarTarea
