import React, { useState, useEffect } from 'react';
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
import translateText from '../Componentes/translate';
import { useGlobalContext } from '../Componentes/GlobalContext';

export default function Registro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [translatedContent, setTranslatedContent] = useState({
    registroUsuario: 'Registro de Usuario',
    correoElectronico: 'Correo Electrónico',
    contrasena: 'Contraseña',
    registrarseButton: 'Registrarse',
    yaCuenta: '¿Ya tienes una cuenta? Inicia sesión',
    errorUsuarioExistente: 'Usuario ya existente',
    errorIngresar: 'Por favor, ingresa tu correo y contraseña'
  });

  const { translate } = useGlobalContext();

  useEffect(() => {
    const translateContent = async () => {
      if (translate) {
        const registroUsuario = await translateText('Registro de Usuario', 'es', 'en');
        const correoElectronico = await translateText('Correo Electrónico', 'es', 'en');
        const contrasena = await translateText('Contraseña', 'es', 'en');
        const registrarseButton = await translateText('Registrarse', 'es', 'en');
        const yaCuenta = await translateText('¿Ya tienes una cuenta? Inicia sesión', 'es', 'en');
        const errorUsuarioExistente = await translateText('Usuario ya existente', 'es', 'en');
        const errorIngresar = await translateText('Por favor, ingresa tu correo y contraseña', 'es', 'en');
        setTranslatedContent({
          registroUsuario,
          correoElectronico,
          contrasena,
          registrarseButton,
          yaCuenta,
          errorUsuarioExistente,
          errorIngresar
        });
      }
    };

    translateContent();
  }, [translate]);

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
          setError(translatedContent.errorUsuarioExistente);
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
        <HowToRegIcon />
      </Avatar>
      <Typography component="h1" variant="h5"   sx={{ marginRight: '5%' }}>
        {translatedContent.registroUsuario}
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
          onChange={(e) => setEmail(e.target.value)}
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
          {translatedContent.registrarseButton}
        </Button>
        <Grid container justifyContent="center">
          <Grid item>
            <Link href="/logeo" variant="body2">
              {translatedContent.yaCuenta}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}