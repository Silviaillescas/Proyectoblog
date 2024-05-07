// SignupPage.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from './Button';
import Input from './Input';

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

const SignupPage = ({ onSignupSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async () => {
    const body = {
      username,
      password,
    };
    const fetchOptions = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await fetch('https://api.tiburoncin.lat/22376/users', fetchOptions);
      if (response.ok) {
        onSignupSuccess();
      } else {
        const errorResponse = await response.json();
        setErrorMessage(errorResponse.error || 'Error creando el usuario.');
      }
    } catch (error) {
      setErrorMessage('Error de conexión o respuesta no válida.');
    }
  };

  return (
    <Card>
      <h1>Crear Usuario</h1>
      <FieldContainer>
        <Input
          label="Usuario"
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Nombre de Usuario"
        />
      </FieldContainer>
      <FieldContainer>
        <Input
          label="Contraseña"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Contraseña"
        />
      </FieldContainer>
      <Button text="Crear Usuario" onClick={handleSubmit} />
      {errorMessage !== '' && (
        <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>
      )}
    </Card>
  );
};

SignupPage.propTypes = {
  onSignupSuccess: PropTypes.func.isRequired,
};

export default SignupPage;
