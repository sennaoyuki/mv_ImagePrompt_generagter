import React from 'react';
import styled from 'styled-components';

const CustomizationsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ComingSoon = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Customizations: React.FC = () => {
  return (
    <CustomizationsContainer>
      <Title>カスタマイズ</Title>
      <Description>
        保存した設定や生成した項目のカスタマイズを管理できます。
      </Description>
      
      <ComingSoon>
        <h2>🚧 開発中</h2>
        <p>カスタマイズ機能は現在開発中です。</p>
      </ComingSoon>
    </CustomizationsContainer>
  );
};

export default Customizations;