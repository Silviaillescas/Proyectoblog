// CreateUserPage.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';
import Input from './Input';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 30px;
  background-color: #fff;
`;

const FieldContainer = styled.div`
  margin-bottom: 15px;
  width: 100%;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

const CreateUserPage = ({ onUserCreated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleCreateUser = async () => {
    const body = { username, password };
    const fetchOptions = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    };
    try {
      const response = await fetch('https://api.tiburoncin.lat/22376/users', fetchOptions);
      if (response.ok) {
        onUserCreated(); // Puedes redirigir o mostrar un mensaje de éxito
      } else {
        const errorResponse = await response.json();
        setErrorMessage(errorResponse.error || 'Error al crear el usuario.');
      }
    } catch (error) {
      setErrorMessage('Error de conexión o respuesta no válida.');
    }
  };

  return (
    <FormContainer>
      <h1>Crear Nuevo Usuario</h1>
      <FieldContainer>
        <Input
          label="Usuario"
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Nombre de usuario"
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
      <Button text="Crear Usuario" onClick={handleCreateUser} />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </FormContainer>
  );
};

export default CreateUserPage;
