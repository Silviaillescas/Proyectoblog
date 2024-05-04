import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  width: 150%;  // Asegura que el header sea tan ancho como la ventana del navegador
  background-color: #8BC34A;  
  color: white;  // Color del texto
  text-align: center;  // Alinea el texto al centro
  padding: 20px 0;  // Agrega padding vertical sin afectar el ancho
  font-size: 24px; // Aumento del tamaño de la fuente
  font-weight: bold; // Fuente en negrita
`;

const Header = ({ title }) => {
  return (
    <HeaderContainer>
      {title}
    </HeaderContainer>
  );
}

export default Header;
