import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// Estilos
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

// Componente principal de administración de blogs
const BlogManagement = () => {
  // Estados para los campos del formulario
  const [posts, setPosts] = useState([]);
  const [flower_name, setFlowerName] = useState('');
  const [color, setColor] = useState('');
  const [season, setSeason] = useState('');
  const [image_url, setImageUrl] = useState('');
  const [editId, setEditId] = useState(null);

  // Carga las publicaciones al montar el componente
  useEffect(() => {
    fetchPosts();
  }, []);

  // Obtiene las publicaciones desde la API
  const fetchPosts = async () => {
    try {
      const response = await fetch('https://api.tiburoncin.lat/22376/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error al obtener publicaciones:', error);
    }
  };

  // Guarda o actualiza una publicación en función de si editId está presente
  const savePost = async () => {
    // Verifica que los campos requeridos estén completos.
    if (!flower_name || !color || !season) {
      console.error('Faltan campos requeridos.');
      return;
    }

    const post = { flower_name, color, season, image_url };
    console.log('Datos enviados:', JSON.stringify(post));

    const url = editId
      ? `https://api.tiburoncin.lat/22376/posts/${encodeURIComponent(editId)}`
      : 'https://api.tiburoncin.lat/22376/posts';
    const method = editId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });

      if (response.ok) {
        fetchPosts();
        // Restablece todos los campos a valores vacíos
        setFlowerName('');
        setColor('');
        setSeason('');
        setImageUrl('');
        setEditId(null);
      } else {
        const errorText = await response.text();
        console.error('Error al guardar la publicación:', errorText);
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  // Elimina una publicación mediante su ID
  const deletePost = async (id) => {
    try {
      const response = await fetch(`https://api.tiburoncin.lat/22376/posts/${encodeURIComponent(id)}`, {
        method: 'DELETE'
      });

      if (response.ok) fetchPosts();
    } catch (error) {
      console.error('Error al eliminar la publicación:', error);
    }
  };

  // Carga los datos de una publicación en el formulario para su edición
  const editPost = (post) => {
    setEditId(post.id);
    setFlowerName(post.flower_name);
    setColor(post.color);
    setSeason(post.season);
    setImageUrl(post.image_url || '');
  };

  // Renderiza el formulario y las publicaciones
  return (
    <div>
      <Title>Administración del Blog</Title>
      <FormContainer>
        <Form onSubmit={(e) => { e.preventDefault(); savePost(); }}>
          <Input type="text" value={flower_name} onChange={(e) => setFlowerName(e.target.value)} placeholder="Nombre de la Flor" required />
          <Input type="text" value={color} onChange={(e) => setColor(e.target.value)} placeholder="Color" required />
          <Input type="text" value={season} onChange={(e) => setSeason(e.target.value)} placeholder="Temporada" requerido />
          <Input type="text" value={image_url} onChange={(e) => setImageUrl(e.target.value)} placeholder="URL de la Imagen" />
          <Button type="submit">{editId ? 'Actualizar Publicación' : 'Agregar Publicación'}</Button>
        </Form>
      </FormContainer>

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
