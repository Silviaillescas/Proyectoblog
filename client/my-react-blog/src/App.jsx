import React from 'react';
import styled from 'styled-components';
import Header from './Header';  // Asegúrate de que la ruta es correcta.
import Posts from './Posts';  // Asegúrate de que la ruta es correcta.
import Footer from './Footer';  // Asegúrate de que la ruta es correcta.

const AppContainer = styled.div`
  padding: 20px;
  min-height: 100vh; // Asegura un mínimo de altura de la ventana de visualización
  display: flex;
  flex-direction: column; // Elementos en columna
  justify-content: flex-start; // Alinea los contenidos al principio
  align-items: center; // Centra horizontalmente los contenidos
  overflow: auto; // Permite el desplazamiento si el contenido es más grande que el contenedor
`;

const App = () => {
  return (
    <AppContainer>
      <Header title="FLOWERSS BLOG" />
      <Posts />
      <Footer />
    </AppContainer>
  );
}

export default App;
