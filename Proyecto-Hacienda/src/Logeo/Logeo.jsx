import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { app } from './Autentificacion'; // Asegúrate de que este archivo esté configurado correctamente
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default function Logeo() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('Usuario autenticado:', user);
          navigate('/app'); // Redirigir a la página principal después de iniciar sesión
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert(`Error: ${errorMessage}`);
        });
    } else {
      alert('Por favor, ingresa tu correo y contraseña');
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#ffffff', 
      padding: '0 20px',
      overflow: 'hidden',
      marginTop: '-200px', // Ajusta este valor según sea necesario
    }}>
      <CssBaseline />
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Iniciar Sesión
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%', maxWidth: '400px' }}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Correo Electrónico"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Contraseña"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Iniciar Sesión
        </Button>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            <Link href="/Registro" variant="body2">
              {"¿No tienes una cuenta? Regístrate"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}