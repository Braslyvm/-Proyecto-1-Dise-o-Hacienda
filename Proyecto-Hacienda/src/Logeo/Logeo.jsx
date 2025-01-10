import React, { useState, useEffect } from 'react';
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
import { app } from './Autentificacion'; 
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import ManejoErrores from './ManejoErrores';
import { useAuth } from './Lectura'; 
import translateText from '../CuerpoElder/translate';
import { useGlobalContext } from '../CuerpoElder/GlobalContext';

export default function Logeo() {
  const { setEmail } = useAuth(); 
  const [email, setEmailLocal] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const [translatedContent, setTranslatedContent] = useState({
    iniciarSesion: 'Iniciar Sesión',
    correoElectronico: 'Correo Electrónico',
    contrasena: 'Contraseña',
    iniciarSesionButton: 'Iniciar Sesión',
    noCuenta: '¿No tienes una cuenta? Regístrate',
    errorCorreoContrasena: 'El correo o la contraseña es incorrecta',
    errorIngresar: 'Por favor, ingresa tu correo y contraseña'
  });

  const { translate } = useGlobalContext();

  useEffect(() => {
    const translateContent = async () => {
      if (translate) {
        const iniciarSesion = 'Log in';
        const correoElectronico = await translateText('Correo Electrónico', 'es', 'en');
        const contrasena = await translateText('Contraseña', 'es', 'en');
        const iniciarSesionButton = await translateText('Iniciar Sesión', 'es', 'en');
        const noCuenta = await translateText('¿No tienes una cuenta? Regístrate', 'es', 'en');
        const errorCorreoContrasena = await translateText('El correo o la contraseña es incorrecta', 'es', 'en');
        const errorIngresar = await translateText('Por favor, ingresa tu correo y contraseña', 'es', 'en');
        setTranslatedContent({
          iniciarSesion,
          correoElectronico,
          contrasena,
          iniciarSesionButton,
          noCuenta,
          errorCorreoContrasena,
          errorIngresar
        });
      }
    };

    translateContent();
  }, [translate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          setEmail(email); 
          const user = userCredential.user;
          navigate('/app'); // Redirigir a la página principal después de iniciar sesión
        })
        .catch((error) => {
          setError(translatedContent.errorCorreoContrasena);
        });
    } else {
      setError(translatedContent.errorIngresar);
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
      marginTop: '-100px',
      marginLeft: '-250px',
    }}>
      <CssBaseline />
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {translatedContent.iniciarSesion}
      </Typography>
      {error && <Typography color="error" variant="body2" sx={{ mt: 2 }}>{error}</Typography>} 
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%', maxWidth: '400px' }}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label={translatedContent.correoElectronico}
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmailLocal(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label={translatedContent.contrasena}
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
          {translatedContent.iniciarSesionButton}
        </Button>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            <Link href="/Registro" variant="body2">
              {translatedContent.noCuenta}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}