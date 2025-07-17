import React from 'react';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  padding: 2rem;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f4f6;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  color: #6b7280;
  font-size: 1rem;
`;

interface LoadingFallbackProps {
  message?: string;
}

const LoadingFallback: React.FC<LoadingFallbackProps> = ({ 
  message = 'システムを読み込み中...' 
}) => {
  return (
    <LoadingContainer>
      <Spinner />
      <LoadingText>{message}</LoadingText>
    </LoadingContainer>
  );
};

export default LoadingFallback;