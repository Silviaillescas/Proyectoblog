// LoginPage.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from './Button';
import Input from './Input'; // Importar el componente personalizado `Input`
import logo from './Images/logo.jpeg'; // Asegúrate de que esta sea la ruta correcta

// Contenedor principal de la tarjeta
const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  max-width: 400px;
  margin: 0 auto 50px;
  border: 1px sólido #ccc;
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

const PasswordContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
`;

const ToggleVisibilityButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0; // Eliminar cualquier padding adicional
  margin-left: 5px;
  display: inline-flex; // Mostrar el ícono en línea sin cuadro
  align-items: center;
  justify-content: center;
`;

const LoginPage = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Manejar el cambio en el campo de usuario
  const handleUsernameChange = (value) => {
    setUsername(value);
  };

  // Manejar el cambio en el campo de contraseña
  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  // Alternar visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Manejar el envío del formulario de inicio de sesión
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

  return (
    <Card>
      {/* Mostrar el logo */}
      <img
        src={logo}
        alt="Logo del Blog"
        style={{ marginBottom: "20px", maxWidth: "100%", height: "auto" }}
      />
      {/* Título principal */}
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        ¡Bienvenido a Flowerss Blog!
      </h1>
      {/* Campo de nombre de usuario */}
      <FieldContainer>
        <Input
          label="Usuario"
          type="text"
          value={username}
          onChange={handleUsernameChange} // Actualizar el estado con el evento `onChange`
          placeholder="Tu nombre de usuario"
        />
      </FieldContainer>
      {/* Campo de contraseña con alternador de visibilidad */}
      <FieldContainer>
        <PasswordContainer>
          <Input
            label="Contraseña"
            type={passwordVisible ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange} // Actualizar el estado con el evento `onChange`
            placeholder="Tu contraseña"
          />
          <ToggleVisibilityButton onClick={togglePasswordVisibility}>
            {passwordVisible ? "👁️" : "🙈"}
          </ToggleVisibilityButton>
        </PasswordContainer>
      </FieldContainer>
      {/* Botón para iniciar sesión */}
      <Button text="Iniciar sesión" onClick={handleSubmit} style={{ marginBottom: "20px" }} />
      {/* Mostrar un mensaje de error si hay un problema de autenticación */}
      {errorMessage !== '' && (
        <div style={{ color: "red", marginTop: "10px" }}>
          {errorMessage}
        </div>
      )}
    </Card>
  );
};

LoginPage.propTypes = {
  setToken: PropTypes.func.isRequired
};

export default LoginPage;
