import React from 'react';
import styled from 'styled-components';

const FooterStyle = styled.footer`
  text-align: center;
  padding: 20px;
  background-color: #f8f9fa;  // Un gris muy claro para el fondo
  color: #6c757d;  // Un gris oscuro para el texto
  position: fixed;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #dee2e6;  // Una línea sutil en la parte superior para definir el pie de página
  font-family: 'Arial', sans-serif;  // Fuente más moderna
  font-size: 14px;
`;


const Footer = () => (
  <FooterStyle>
    <p>Copyright 2024 UVG</p>
  </FooterStyle>
);

export default Footer;
