import React from 'react';
import styled from 'styled-components';
import { useApp } from '../../context/AppContext';

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text};
`;

const StatusBadge = styled.div<{ $loading: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme, $loading }) => 
    $loading ? theme.colors.warning : theme.colors.success};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

const LoadingSpinner = styled.div`
  width: 12px;
  height: 12px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Header: React.FC = () => {
  const { state } = useApp();

  return (
    <HeaderContainer>
      <Title>リスティング広告ランキング項目生成システム</Title>
      <StatusBadge $loading={state.loading}>
        {state.loading && <LoadingSpinner />}
        {state.loading ? '処理中...' : '準備完了'}
      </StatusBadge>
    </HeaderContainer>
  );
};

export default Header;