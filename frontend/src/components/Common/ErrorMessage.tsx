import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ErrorIcon = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  color: #dc2626;
`;

const ErrorText = styled.p`
  color: #dc2626;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  margin: 0;
  flex: 1;
`;

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <ErrorContainer>
      <ErrorIcon>⚠️</ErrorIcon>
      <ErrorText>{message}</ErrorText>
    </ErrorContainer>
  );
};

export default ErrorMessage;