import React from 'react';
import styled from 'styled-components';
import { Genre, Region } from '../../types';

interface GenreSelectorProps {
  genres: Genre[];
  regions: Region[];
  selectedGenres: string[];
  selectedRegions: string[];
  onGenreChange: (genres: string[]) => void;
  onRegionChange: (regions: string[]) => void;
  seoOptimized: boolean;
  includeCompliance: boolean;
  onConfigChange: (config: { seoOptimized: boolean; includeCompliance: boolean }) => void;
}

const SelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Section = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: ${({ theme }) => theme.spacing.lg};
  
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CheckboxList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const CheckboxItem = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  }
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: ${({ theme }) => theme.colors.primary};
`;

const CheckboxLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};
`;

const CategoryBadge = styled.span<{ $category: string }>`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ theme, $category }) => {
    switch ($category) {
      case 'medical': return '#fef3c7';
      case 'beauty': return '#f3e8ff';
      case 'fitness': return '#dcfce7';
      default: return '#f1f5f9';
    }
  }};
  color: ${({ theme, $category }) => {
    switch ($category) {
      case 'medical': return '#92400e';
      case 'beauty': return '#7c3aed';
      case 'fitness': return '#166534';
      default: return '#475569';
    }
  }};
  margin-left: auto;
`;

const GenreSelector: React.FC<GenreSelectorProps> = ({
  genres,
  regions,
  selectedGenres,
  selectedRegions,
  onGenreChange,
  onRegionChange,
  seoOptimized,
  includeCompliance,
  onConfigChange,
}) => {
  const handleGenreToggle = (genreId: string) => {
    const newSelection = selectedGenres.includes(genreId)
      ? selectedGenres.filter(id => id !== genreId)
      : [...selectedGenres, genreId];
    onGenreChange(newSelection);
  };

  const handleRegionToggle = (regionId: string) => {
    const newSelection = selectedRegions.includes(regionId)
      ? selectedRegions.filter(id => id !== regionId)
      : [...selectedRegions, regionId];
    onRegionChange(newSelection);
  };

  return (
    <SelectorContainer>
      <Section>
        <SectionTitle>ジャンル選択</SectionTitle>
        <CheckboxList>
          {genres.map((genre) => (
            <CheckboxItem key={genre.id}>
              <Checkbox
                type="checkbox"
                checked={selectedGenres.includes(genre.id)}
                onChange={() => handleGenreToggle(genre.id)}
              />
              <CheckboxLabel>{genre.name}</CheckboxLabel>
              <CategoryBadge $category={genre.category}>
                {genre.category}
              </CategoryBadge>
            </CheckboxItem>
          ))}
        </CheckboxList>
      </Section>

      <Section>
        <SectionTitle>地域選択（任意）</SectionTitle>
        <CheckboxList>
          {regions.slice(0, 5).map((region) => (
            <CheckboxItem key={region.id}>
              <Checkbox
                type="checkbox"
                checked={selectedRegions.includes(region.id)}
                onChange={() => handleRegionToggle(region.id)}
              />
              <CheckboxLabel>{region.name}</CheckboxLabel>
            </CheckboxItem>
          ))}
        </CheckboxList>
      </Section>

      <Section>
        <SectionTitle>オプション</SectionTitle>
        <CheckboxList>
          <CheckboxItem>
            <Checkbox
              type="checkbox"
              checked={seoOptimized}
              onChange={(e) => onConfigChange({ seoOptimized: e.target.checked, includeCompliance })}
            />
            <CheckboxLabel>SEO最適化</CheckboxLabel>
          </CheckboxItem>
          <CheckboxItem>
            <Checkbox
              type="checkbox"
              checked={includeCompliance}
              onChange={(e) => onConfigChange({ seoOptimized, includeCompliance: e.target.checked })}
            />
            <CheckboxLabel>法的コンプライアンス項目を含める</CheckboxLabel>
          </CheckboxItem>
        </CheckboxList>
      </Section>
    </SelectorContainer>
  );
};

export default GenreSelector;