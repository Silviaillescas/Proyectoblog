// PostCard.jsx

import React, { useState } from 'react';
import styled from 'styled-components';
import ImageMap from './Images/ImageMap';  

const Card = styled.div`
  margin: 10px;
  margin-bottom: 30px; // Aumenta el margen inferior
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  min-height: 350px;
  background: #fff; // Fondo blanco para visibilidad
  box-shadow: 0px 2px 5px rgba(0,0,0,0.1); // Ligera sombra para mejor definición
`;

const CardImage = styled.img`
  width: 100%;
  max-height: 150px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
`;

const CardTitle = styled.h2`
  color: #333;
`;

const CardBody = styled.p`
  color: #666;
`;

const RatingContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
`;

const Star = styled.span`
  cursor: pointer;
  color: ${props => props.selected ? 'gold' : 'gray'};
  &:hover,
  &.selected {
    transform: scale(1.3);
    color: gold;
  }
`;

const Rating = ({ rating, setRating }) => {
  return (
    <RatingContainer>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          selected={rating > index}
          onClick={() => setRating(index + 1)}
        >
          ★
        </Star>
      ))}
    </RatingContainer>
  );
};

const PostCard = ({ post }) => {
  const [rating, setRating] = useState(0);
  const ImagePath = ImageMap[post.flower_name]; 

  return (
    <Card>
      <CardImage src={ImagePath} alt={post.flower_name} />
      <CardTitle>{post.flower_name}</CardTitle>
      <CardBody>Color: {post.color}</CardBody>
      <CardBody>Season: {post.season}</CardBody>
      <CardBody>Created At: {new Date(post.created_at).toLocaleDateString()}</CardBody>
      <Rating rating={rating} setRating={setRating} />
    </Card>
  );
};

export default PostCard;
