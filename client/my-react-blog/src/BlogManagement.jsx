// LoginPage.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from './Button';
import logo from './Images/logo.jpeg'; // Asegúrate de que esta sea la ruta correcta

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

// Contenedor para etiquetas y campos de entrada
const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
`;

// Estilo para las etiquetas
const Label = styled.label`
  margin-bottom: 5px;
  text-align: center;
  font-weight: bold;
`;

// Mensaje de error
const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

// Título principal
const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

// Campo de entrada
const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center; // Centrar el texto dentro del campo
`;

// Contenedor para el campo de contraseña y su visibilidad
const PasswordContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
`;

// Botón para alternar la visibilidad de la contraseña
const ToggleVisibilityButton = styled.button`
  background: transparente;
  borde: ninguno;
  cursor: pointer;
  margen-izquierda: 5px;
`;

const LoginPage = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Función para manejar el evento de cambio en el campo de usuario
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // Función para manejar el evento de cambio en el campo de contraseña
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    const body = {
      userName: username,
      passwordHash: password // Ajusta según tu lógica de autenticación
    };
    const fetchOptions = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const response = await fetch('http://localhost:3000/auth/login', fetchOptions);
    const data = await response.json();
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
      <img
        src={logo}
        alt="Logo del Blog"
        style={{ marginBottom: "20px", maxWidth: "100%", height: "auto" }}
      />
      <Title>¡Bienvenido a Flowerss Blog!</Title>
      {/* Campo de nombre de usuario */}
      <FieldContainer>
        <Label htmlFor="username">Usuario</Label>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={handleUsernameChange} // Manejar evento de cambio para usuario
          placeholder="Tu nombre de usuario"
        />
      </FieldContainer>
      {/* Campo de contraseña con alternador de visibilidad */}
      <FieldContainer>
        <Label htmlFor="password">Contraseña</Label>
        <PasswordContainer>
          <Input
            id="password"
            type={passwordVisible ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange} // Manejar evento de cambio para contraseña
            placeholder="Tu contraseña"
          />
          <ToggleVisibilityButton onClick={togglePasswordVisibility}>
            {passwordVisible ? "👁️" : "🙈"}
          </ToggleVisibilityButton>
        </PasswordContainer>
      </FieldContainer>
      <Button text="Iniciar sesión" onClick={handleSubmit} style={{ marginBottom: "20px" }} />
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
