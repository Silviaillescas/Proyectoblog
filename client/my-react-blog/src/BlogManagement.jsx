import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// Estilos para el contenedor del formulario y la lista de publicaciones
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Form = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 8px 15px;
  border: none;
  background-color: #28a745;
  color: white;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #218838;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const PostsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
`;

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 10px;
  width: 300px;
  text-align: center;
  background-color: #fff;
`;

const BlogManagement = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('');
  const [season, setSeason] = useState('');
  const [editId, setEditId] = useState(null);

  // Función para manejar el cambio en el campo de título
  const handleTitleChange = (e) => {
    const value = e.target.value;
    console.log('Título:', value);
    setTitle(value);
  };

  // Función para manejar el cambio en el campo de color
  const handleColorChange = (e) => {
    const value = e.target.value;
    console.log('Color:', value);
    setColor(value);
  };

  // Función para manejar el cambio en el campo de temporada
  const handleSeasonChange = (e) => {
    const value = e.target.value;
    console.log('Temporada:', value);
    setSeason(value);
  };

  // Obtener todas las publicaciones
  const fetchPosts = async () => {
    const response = await fetch('http://localhost:3000/posts');
    const data = await response.json();
    setPosts(data);
  };

  // Crear o actualizar una publicación
  const savePost = async () => {
    const post = { flower_name: title, color, season };
    console.log('Datos enviados:', post);
    let response;

    const url = editId ? `http://localhost:3000/posts/${editId}` : 'http://localhost:3000/posts';
    const method = editId ? 'PUT' : 'POST';

    response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post)
    });

    if (response.ok) {
      fetchPosts(); // Refrescar la lista de publicaciones
      setTitle('');
      setColor('');
      setSeason('');
      setEditId(null);
    } else {
      console.error('Error al guardar la publicación:', await response.text());
    }
  };

  // Eliminar una publicación
  const deletePost = async (id) => {
    const response = await fetch(`http://localhost:3000/posts/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) fetchPosts();
  };

  // Cargar los datos de una publicación para editarla
  const editPost = (post) => {
    setTitle(post.flower_name);
    setColor(post.color);
    setSeason(post.season);
    setEditId(post.id);
  };

  useEffect(() => {
    fetchPosts(); // Cargar las publicaciones al montar el componente
  }, []);

  return (
    <div>
      <Title>Administración del Blog</Title>
      <FormContainer>
        <Form onSubmit={(e) => { e.preventDefault(); savePost(); }}>
          <Input type="text" value={title} onChange={handleTitleChange} placeholder="Nombre de la Flor" required />
          <Input type="text" value={color} onChange={handleColorChange} placeholder="Color" required />
          <Input type="text" value={season} onChange={handleSeasonChange} placeholder="Temporada" required />
          <Button type="submit">{editId ? 'Actualizar Publicación' : 'Agregar Publicación'}</Button>
        </Form>
      </FormContainer>

      {/* Lista de Publicaciones */}
      <PostsList>
        {posts.map(post => (
          <Card key={post.id}>
            <h3>{post.flower_name}</h3>
            <p><strong>Color:</strong> {post.color}</p>
            <p><strong>Temporada:</strong> {post.season}</p>
            <Button onClick={() => editPost(post)}>Editar</Button>
            <Button style={{ backgroundColor: '#dc3545' }} onClick={() => deletePost(post.id)}>Eliminar</Button>
          </Card>
        ))}
      </PostsList>
    </div>
  );
};

export default BlogManagement;

