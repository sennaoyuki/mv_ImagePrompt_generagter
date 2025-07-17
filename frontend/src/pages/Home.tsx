import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

const QuickStart = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xxl};
  max-width: 600px;
  margin: 0 auto ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

const QuickStartTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const GenreInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }
`;

const GenreSuggestions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const GenreChip = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

const StartButton = styled.button`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.secondary};
    cursor: not-allowed;
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  transition: background-color 0.2s ease;
  margin-top: ${({ theme }) => theme.spacing.md};

  &:hover {
    opacity: 0.9;
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
  const [genreInput, setGenreInput] = useState('');
  const navigate = useNavigate();

  const popularGenres = [
    '医療脱毛', 'AGA治療', '包茎手術', '痩身治療', 
    '美容整形', '歯科医院', 'エステサロン', 'ジム・フィットネス'
  ];

  const handleGenreChipClick = (genre: string) => {
    setGenreInput(genre);
  };

  const handleStartGeneration = () => {
    if (genreInput.trim()) {
      // Navigate to generator with genre parameter
      navigate(`/generator?genre=${encodeURIComponent(genreInput)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && genreInput.trim()) {
      handleStartGeneration();
    }
  };

  return (
    <HomeContainer>
      <Hero>
        <HeroTitle>
          ランキングサイト項目生成システム
        </HeroTitle>
        <HeroDescription>
          ジャンルを入力するだけで、ランキングサイトに必要な項目を自動抽出。
          法的コンプライアンスとSEO最適化を考慮した効果的な項目リストを生成します。
        </HeroDescription>
        
        <QuickStart>
          <QuickStartTitle>🚀 今すぐ始める</QuickStartTitle>
          <GenreInput
            type="text"
            placeholder="ジャンルを入力してください（例：医療脱毛、AGA治療）"
            value={genreInput}
            onChange={(e) => setGenreInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          
          <GenreSuggestions>
            {popularGenres.map((genre) => (
              <GenreChip
                key={genre}
                onClick={() => handleGenreChipClick(genre)}
              >
                {genre}
              </GenreChip>
            ))}
          </GenreSuggestions>
          
          <StartButton
            onClick={handleStartGeneration}
            disabled={!genreInput.trim()}
          >
            {genreInput.trim() ? `「${genreInput}」の項目を生成` : '項目を生成'}
          </StartButton>
          
          <div style={{ textAlign: 'center' }}>
            <CTAButton to="/generator">
              詳細設定で生成する
            </CTAButton>
          </div>
        </QuickStart>
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