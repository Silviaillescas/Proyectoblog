import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from './Button';
import Input from './Input';
import logo from './Images/logo.jpeg';

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

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
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
  padding: 0;
  margin-left: 5px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const LoginPage = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Actualiza con el evento directamente
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const handleSubmit = async () => {
    const body = {
      userName: username, // Asegúrate de que el nombre coincida con tu base de datos
      passwordHash: password
    };
    const fetchOptions = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const response = await fetch('http://localhost:3000/auth/login', fetchOptions);
      if (response.ok) {
        const data = await response.json(); // Asegúrate de que sea JSON válido
        const token = data.token || '';
        setToken(token); // Pasa el token al componente principal
      } else {
        const errorResponse = await response.json();
        setErrorMessage(errorResponse.error || 'Credenciales inválidas.');
      }
    } catch (error) {
      setErrorMessage('Error de conexión o respuesta no válida.');
    }
  };

  return (
    <Card>
      <img src={logo} alt="Logo del Blog" style={{ marginBottom: "20px", maxWidth: "100%", height: "auto" }} />
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>¡Bienvenido a Flowerss Blog!</h1>
      <FieldContainer>
        <Input
          label="Usuario"
          type="text"
          value={username}
          onChange={handleUsernameChange} // Actualiza directamente desde el evento
          placeholder="Tu nombre de usuario"
        />
      </FieldContainer>
      <FieldContainer>
        <PasswordContainer>
          <Input
            label="Contraseña"
            type={passwordVisible ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange} // Actualiza directamente desde el evento
            placeholder="Tu contraseña"
          />
          <ToggleVisibilityButton onClick={togglePasswordVisibility}>
            {passwordVisible ? "👁️" : "🙈"}
          </ToggleVisibilityButton>
        </PasswordContainer>
      </FieldContainer>
      <Button text="Iniciar sesión" onClick={handleSubmit} />
      {errorMessage !== '' && (
        <div style={{ color: "red", marginTop: "10px" }}>{errorMessage}</div>
      )}
    </Card>
  );
};

LoginPage.propTypes = {
  setToken: PropTypes.func.isRequired
};

export default LoginPage;
