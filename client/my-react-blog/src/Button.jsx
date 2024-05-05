import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 10px 15px;
  margin-top: 10px;
  background-color: #F0B27A;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color:#EB984E ;
  }
`;

const Button = ({ text, onClick }) => (
  <StyledButton onClick={onClick}>{text}</StyledButton>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
