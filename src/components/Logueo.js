import React, { useState } from 'react';
import { Stack, Container, Form, Button } from 'react-bootstrap';
import firebaseApp from '../credenciales';
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signInWithRedirect,
    GoogleAuthProvider 
} from 'firebase/auth';

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const Logueo = () => {
    const [estaRegistrandose, setEstaRegistrandose] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const correo = e.target.formBasicEmail.value;
        const contra = e.target.formBasicPassword.value;
        if(estaRegistrandose) {
            // si se está registrando
            const usuario = await createUserWithEmailAndPassword(
                    auth,
                    correo, 
                    contra
                    );
        } else {
            //si está iniciando sesión
            signInWithEmailAndPassword(auth, correo, contra)
        }

        

    }

  return (

    <Container>
        <Stack gap={3}>
        <h1>{estaRegistrandose ? 'Regístrate' : 'Inicia sesión'}</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="dark" type="submit">
                {estaRegistrandose ? 'Regístrate' : 'Inicia sesión'}
            </Button>
        </Form>

        <Button 
            variant="primary" 
            type="submit" 
            style={{ width: '300px' }} 
            onClick={() => signInWithRedirect(auth, googleProvider)}
        >
                Acceder con google
        </Button>

        <Button 
            style={{ width: '300px' }}
            variant="dark"
            onClick={() => setEstaRegistrandose(!estaRegistrandose)}
            >
                 {estaRegistrandose ? '¿Ya tienes cuenta? Inícia sesión' : '¿No tienes cuenta? Regístrate'}
        </Button>

        </Stack>
    </Container>
  )
}

export default Logueo
