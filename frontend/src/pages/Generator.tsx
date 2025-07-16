import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useApp } from '../context/AppContext';
import { genresApi, regionsApi, itemsApi } from '../utils/api';
import { GenerateRequest } from '../types';
import GenreSelector from '../components/GenreSelector/GenreSelector';
import ItemList from '../components/ItemList/ItemList';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import ErrorMessage from '../components/Common/ErrorMessage';

const GeneratorContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const GeneratorHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
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
`;

const GeneratorContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: ${({ theme }) => theme.spacing.xl};
  min-height: 600px;
`;

const SelectorPanel = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  height: fit-content;
`;

const ResultsPanel = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  min-height: 400px;
`;

const GenerateButton = styled.button`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: ${({ theme }) => theme.spacing.lg};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.secondary};
    cursor: not-allowed;
  }
`;

const Generator: React.FC = () => {
  const { state, actions } = useApp();
  const [generateConfig, setGenerateConfig] = useState({
    seoOptimized: false,
    includeCompliance: true,
  });

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        actions.setLoading(true);
        const [genres, regions] = await Promise.all([
          genresApi.getGenres(),
          regionsApi.getRegions(),
        ]);
        actions.setGenres(genres);
        actions.setRegions(regions);
      } catch (error) {
        actions.setError(error instanceof Error ? error.message : 'データの読み込みに失敗しました');
      } finally {
        actions.setLoading(false);
      }
    };

    loadInitialData();
  }, [actions]);

  const handleGenerateItems = async () => {
    if (state.selectedGenres.length === 0) {
      actions.setError('少なくとも1つのジャンルを選択してください');
      return;
    }

    try {
      actions.setLoading(true);
      actions.setError(null);

      const request: GenerateRequest = {
        genres: state.selectedGenres,
        region: state.selectedRegions[0], // Single region for now
        seoOptimized: generateConfig.seoOptimized,
        includeCompliance: generateConfig.includeCompliance,
      };

      const response = await itemsApi.generateItems(request);
      const allItems = [
        ...response.commonItems,
        ...response.genreSpecificItems,
        ...response.regionSpecificItems,
        ...response.complianceItems,
      ];

      actions.setGeneratedItems(allItems);
      actions.setSelectedItems(allItems.filter(item => item.priority === 'required').map(item => item.id));
    } catch (error) {
      actions.setError(error instanceof Error ? error.message : '項目の生成に失敗しました');
    } finally {
      actions.setLoading(false);
    }
  };

  if (state.loading && state.genres.length === 0) {
    return (
      <GeneratorContainer>
        <LoadingSpinner />
      </GeneratorContainer>
    );
  }

  return (
    <GeneratorContainer>
      <GeneratorHeader>
        <Title>項目生成</Title>
        <Description>
          ジャンルや地域を選択して、ランキングサイトに必要な項目を自動生成します。
        </Description>
      </GeneratorHeader>

      {state.error && <ErrorMessage message={state.error} />}

      <GeneratorContent>
        <SelectorPanel>
          <GenreSelector
            genres={state.genres}
            regions={state.regions}
            selectedGenres={state.selectedGenres}
            selectedRegions={state.selectedRegions}
            onGenreChange={actions.setSelectedGenres}
            onRegionChange={actions.setSelectedRegions}
            seoOptimized={generateConfig.seoOptimized}
            includeCompliance={generateConfig.includeCompliance}
            onConfigChange={setGenerateConfig}
          />
          
          <GenerateButton
            onClick={handleGenerateItems}
            disabled={state.loading || state.selectedGenres.length === 0}
          >
            {state.loading ? '生成中...' : '項目を生成'}
          </GenerateButton>
        </SelectorPanel>

        <ResultsPanel>
          {state.generatedItems.length > 0 ? (
            <ItemList
              items={state.generatedItems}
              selectedItems={state.selectedItems}
              onItemToggle={(itemId) => {
                const newSelectedItems = state.selectedItems.includes(itemId)
                  ? state.selectedItems.filter(id => id !== itemId)
                  : [...state.selectedItems, itemId];
                actions.setSelectedItems(newSelectedItems);
              }}
              onCustomItemAdd={(item) => {
                actions.setCustomItems([...state.customItems, item]);
              }}
            />
          ) : (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '100%',
              color: '#94a3b8' 
            }}>
              ジャンルを選択して「項目を生成」ボタンをクリックしてください
            </div>
          )}
        </ResultsPanel>
      </GeneratorContent>
    </GeneratorContainer>
  );
};

export default Generator;