// LoginPage.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from './Input';
import Button from './Button';
import logo from './Images/logo.jpeg'; 

// Contenedor principal de la tarjeta
const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  max-width: 400px;
  margin: 0 auto 50px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
`;

// Contenedor para las etiquetas y campos de entrada
const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
`;

// Estilos para las etiquetas
const Label = styled.label`
  margin-bottom: 5px;
  text-align: center;
  font-weight: bold;
`;

// Estilos para los mensajes de error
const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

// Título principal de la página
const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

// Contenedor para el campo de contraseña y su visibilidad
const PasswordContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
`;

// Estilos para el campo de entrada de la contraseña
const PasswordInput = styled(Input)`
  flex-grow: 1;
  text-align: center; // Centrar el texto dentro del campo
`;

// Estilos para el botón de visibilidad de la contraseña
const ToggleVisibilityButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  margin-left: 5px;
`;

const LoginPage = ({ setToken }) => {
  // Definir los estados para el nombre de usuario, la contraseña y los mensajes de error
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = async () => {
    // Cuerpo del POST para la solicitud de autenticación
    const body = {
      userName: username,
      passwordHash: password 
    };
    // Opciones para la solicitud POST
    const fetchOptions = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    // Realiza la solicitud de inicio de sesión
    const response = await fetch('http://localhost:3000/auth/login', fetchOptions);
    const data = await response.json();
    // Comprueba si la solicitud fue exitosa o hubo un error
    if (response.ok) {
      const token = data.token || 'simulated-token';
      setToken(token);
    } else {
      setErrorMessage('Credenciales inválidas.');
    }
  };

  // Alternar visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <Card>
      {/* Mostrar la imagen del logo */}
      <img
        src={logo}
        alt="Logo del Blog"
        style={{ marginBottom: "20px", maxWidth: "100%", height: "auto" }}
      />
      {/* Título de la página */}
      <Title>¡Bienvenido a Flowerss Blog!</Title>
      {/* Campo de nombre de usuario */}
      <FieldContainer>
        <Label htmlFor="username">Usuario</Label>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Tu nombre de usuario"
          style={{ textAlign: "center" }} // Centrar el texto dentro del campo
        />
      </FieldContainer>
      {/* Campo de contraseña con alternador de visibilidad */}
      <FieldContainer>
        <Label htmlFor="password">Contraseña</Label>
        <PasswordContainer>
          <PasswordInput
            id="password"
            type={passwordVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Tu contraseña"
            style={{ textAlign: "center" }} // Centrar el texto dentro del campo
          />
          <ToggleVisibilityButton onClick={togglePasswordVisibility}>
            {passwordVisible ? "👁️" : "🙈"}
          </ToggleVisibilityButton>
        </PasswordContainer>
      </FieldContainer>
      {/* Botón de iniciar sesión */}
      <Button text="Iniciar sesión" onClick={handleSubmit} style={{ marginBottom: "20px" }} />
      {/* Mensaje de error */}
      {errorMessage !== '' && (
        <ErrorMessage onClick={() => setErrorMessage('')}>{errorMessage}</ErrorMessage>
      )}
    </Card>
  );
};

LoginPage.propTypes = {
  setToken: PropTypes.func.isRequired
};

export default LoginPage;


