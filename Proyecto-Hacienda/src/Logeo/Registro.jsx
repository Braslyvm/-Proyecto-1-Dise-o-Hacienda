import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default function Registro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('Usuario registrado:', user);
          navigate('/logeo'); // Redirigir al login después del registro
        })
        .catch((error) => {
          setError('Usuario ya existente');
        });
    } else {
      setError('Por favor, ingresa tu correo y contraseña');
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
      marginTop: '-200px',
    }}>
      <CssBaseline />
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <HowToRegIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Registro de Usuario
      </Typography>
      {error && <Typography color="error" variant="body2" sx={{ mt: 2 }}>{error}</Typography>} 
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
          autoComplete="new-password"
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
          Registrarse
        </Button>
        <Grid container justifyContent="center">
          <Grid item>
            <Link href="/logeo" variant="body2">
              {"¿Ya tienes una cuenta? Inicia sesión"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
