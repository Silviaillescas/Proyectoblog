import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Posts from './Posts';
import Footer from './Footer';
import LoginPage from './LoginPage';
import BlogManagement from './BlogManagement';

// Contenedor principal
const AppContainer = styled.div`
  padding: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: auto;
`;

// Barra de navegación
const NavBar = styled.nav`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

// Botón de navegación
const NavButton = styled.button`
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #f7f7f7;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const App = () => {
  const [activePage, setActivePage] = useState('posts'); // Página por defecto

  // Función para cambiar entre páginas
  const navigateTo = (page) => {
    setActivePage(page);
  };

  // Renderizado condicional
  const renderContent = () => {
    switch (activePage) {
      case 'posts':
        return <Posts />;
      case 'login':
        return <LoginPage />;
      case 'admin':
        return <BlogManagement />;
      default:
        return <Posts />;
    }
  };

  return (
    <AppContainer>
      <Header title="FLOWERSS BLOG" />
      {/* Barra de Navegación */}
      <NavBar>
        <NavButton onClick={() => navigateTo('posts')}>Posts</NavButton>
        <NavButton onClick={() => navigateTo('login')}>Iniciar Sesión</NavButton>
        <NavButton onClick={() => navigateTo('admin')}>Administración</NavButton>
      </NavBar>
      {/* Contenido */}
      {renderContent()}
      <Footer />
    </AppContainer>
  );
};

export default App;
