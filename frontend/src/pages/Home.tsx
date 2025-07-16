import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Hero = styled.section`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const HeroTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const HeroDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 600px;
  margin: 0 auto ${({ theme }) => theme.spacing.xl};
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const FeatureCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const FeatureIcon = styled.div`
  font-size: 2rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const FeatureTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
`;

const features = [
  {
    icon: '📋',
    title: '共通項目自動生成',
    description: 'どのジャンルでも必要な基本的なランキング項目を自動で生成します。',
  },
  {
    icon: '🏥',
    title: 'ジャンル特化項目',
    description: '医療脱毛、AGA治療、包茎手術などの専門項目を提供します。',
  },
  {
    icon: '⚖️',
    title: '法的コンプライアンス',
    description: '薬機法や景品表示法に対応した安全な項目を自動生成します。',
  },
  {
    icon: '🎯',
    title: 'SEO最適化',
    description: '検索上位表示に効果的な項目構成を提案します。',
  },
  {
    icon: '📝',
    title: 'コンテンツテンプレート',
    description: '各項目の具体的なコンテンツ例とテンプレートを提供します。',
  },
  {
    icon: '🌏',
    title: '地域別対応',
    description: 'エリア特化型ランキングサイト向けの項目を生成します。',
  },
];

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <Hero>
        <HeroTitle>
          ランキングサイト項目生成システム
        </HeroTitle>
        <HeroDescription>
          リスティング広告で使用するランキングサイトの項目を、
          ジャンルや地域に応じて自動生成。
          法的コンプライアンスとSEO最適化を考慮した
          効果的なランキングサイトを簡単に作成できます。
        </HeroDescription>
        <CTAButton to="/generator">
          項目生成を開始
        </CTAButton>
      </Hero>

      <FeaturesGrid>
        {features.map((feature, index) => (
          <FeatureCard key={index}>
            <FeatureIcon>{feature.icon}</FeatureIcon>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
          </FeatureCard>
        ))}
      </FeaturesGrid>
    </HomeContainer>
  );
};

export default Home;