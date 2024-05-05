import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Posts from './Posts';
import Footer from './Footer';
import LoginPage from './LoginPage';
import BlogManagement from './BlogManagement';

const AppContainer = styled.div`
  padding: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: auto;
`;

const NavBar = styled.nav`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

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
  const [token, setToken] = useState(null);

  const navigateTo = (page) => {
    setActivePage(page);
  };

  const handleSetToken = (newToken) => {
    setToken(newToken);
    navigateTo('admin');  // Cambia a la página de administración
  };

  const renderContent = () => {
    switch (activePage) {
      case 'posts':
        return <Posts />;
      case 'login':
        return <LoginPage setToken={handleSetToken} />;
      case 'admin':
        return token ? <BlogManagement /> : <LoginPage setToken={handleSetToken} />;
      default:
        return <Posts />;
    }
  };

  return (
    <AppContainer>
      <Header title="FLOWERSS BLOG" />
      <NavBar>
        <NavButton onClick={() => navigateTo('posts')}>Posts</NavButton>
        <NavButton onClick={() => navigateTo('login')}>Iniciar Sesión</NavButton>
        <NavButton onClick={() => navigateTo('admin')}>Administración</NavButton>
      </NavBar>
      {renderContent()}
      <Footer />
    </AppContainer>
  );
};

export default App;
