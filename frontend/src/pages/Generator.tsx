import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useApp } from '../context/AppContext';
import { useSearchParams } from 'react-router-dom';
import { Item } from '../types';
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
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 800px;
  margin: 0 auto;
`;

const InputSection = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const GenreInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
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

const ResultsPanel = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  min-height: 400px;
`;

const GenerateButton = styled.button`
  max-width: 300px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
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

const ExportActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const ExportButton = styled.button<{ $variant?: 'secondary' }>`
  flex: 1;
  background-color: ${({ theme, $variant }) => 
    $variant === 'secondary' ? theme.colors.secondary : theme.colors.success};
  color: white;
  border: none;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.secondary};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const Generator: React.FC = () => {
  const { state, actions } = useApp();
  const [searchParams] = useSearchParams();
  const [genreInput, setGenreInput] = useState('');
  const [generateConfig, setGenerateConfig] = useState({
    seoOptimized: false,
    includeCompliance: true,
  });

  // Get genre from URL parameters if available
  useEffect(() => {
    const genreFromUrl = searchParams.get('genre');
    if (genreFromUrl) {
      const decodedGenre = decodeURIComponent(genreFromUrl);
      setGenreInput(decodedGenre);
      // Auto-generate items if genre is provided from URL
      setTimeout(() => {
        generateItemsForGenre(decodedGenre);
      }, 500);
    }
  }, [searchParams, generateItemsForGenre]);

  const generateItemsForGenre = (genre: string) => {
    if (!genre.trim()) return;
    
    try {
      actions.setLoading(true);
      actions.setError(null);

      const mockItems = generateMockItems(genre, generateConfig);
      actions.setGeneratedItems(mockItems);
      actions.setSelectedItems(mockItems.filter(item => item.priority === 'required').map(item => item.id));
    } catch (error) {
      actions.setError(error instanceof Error ? error.message : '項目の生成に失敗しました');
    } finally {
      actions.setLoading(false);
    }
  };

  const popularGenres = [
    '医療脱毛', 'AGA治療', '包茎手術', '痩身治療', 
    '美容整形', '歯科医院', 'エステサロン', 'ジム・フィットネス'
  ];

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        actions.setLoading(true);
        
        // Mock data for demonstration
        const currentTime = new Date().toISOString();
        const mockGenres = [
          { id: '1', name: '医療脱毛', category: 'medical' as const, seoKeywords: ['脱毛', '医療'], createdAt: currentTime, updatedAt: currentTime },
          { id: '2', name: 'AGA治療', category: 'medical' as const, seoKeywords: ['AGA', '薄毛'], createdAt: currentTime, updatedAt: currentTime },
          { id: '3', name: '包茎手術', category: 'medical' as const, seoKeywords: ['包茎', '手術'], createdAt: currentTime, updatedAt: currentTime },
          { id: '4', name: '痩身治療', category: 'medical' as const, seoKeywords: ['痩身', 'ダイエット'], createdAt: currentTime, updatedAt: currentTime },
        ];
        
        const mockRegions = [
          { id: '1', name: '東京', prefecture: '東京都', areaCode: '13', createdAt: currentTime, updatedAt: currentTime },
          { id: '2', name: '大阪', prefecture: '大阪府', areaCode: '27', createdAt: currentTime, updatedAt: currentTime },
        ];
        
        actions.setGenres(mockGenres);
        actions.setRegions(mockRegions);
      } catch (error) {
        actions.setError(error instanceof Error ? error.message : 'データの読み込みに失敗しました');
      } finally {
        actions.setLoading(false);
      }
    };

    loadInitialData();
  }, [actions]);

  const handleGenerateItems = async () => {
    if (!genreInput.trim()) {
      actions.setError('ジャンルを入力してください');
      return;
    }

    try {
      actions.setLoading(true);
      actions.setError(null);

      // Find matching genre from available genres or create generic one
      // const matchingGenre = state.genres.find(g => 
      //   g.name.includes(genreInput) || genreInput.includes(g.name)
      // );

      // Generate mock items based on genre input
      const mockItems = generateMockItems(genreInput, generateConfig);
      
      actions.setGeneratedItems(mockItems);
      actions.setSelectedItems(mockItems.filter(item => item.priority === 'required').map(item => item.id));
    } catch (error) {
      actions.setError(error instanceof Error ? error.message : '項目の生成に失敗しました');
    } finally {
      actions.setLoading(false);
    }
  };

  const handleGenreChipClick = (genre: string) => {
    setGenreInput(genre);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleGenerateItems();
    }
  };

  const generateMockItems = (genre: string, config: any): Item[] => {
    const currentTime = new Date().toISOString();
    const defaultGuidelines = {
      recommendedLength: 200,
      keywordSuggestions: [genre, 'ランキング', '比較'],
      avoidExpressions: ['絶対', '必ず', '100%']
    };

    const baseItems: Item[] = [
      {
        id: '1',
        name: 'ランキング表示',
        description: 'サービス・クリニックのランキング形式での表示',
        priority: 'required' as const,
        type: 'common' as const,
        seoWeight: 9,
        contentGuidelines: defaultGuidelines,
        createdAt: currentTime,
        updatedAt: currentTime,
      },
      {
        id: '2',
        name: '料金比較',
        description: '各サービスの料金体系の比較表示',
        priority: 'required' as const,
        type: 'common' as const,
        seoWeight: 8,
        contentGuidelines: defaultGuidelines,
        createdAt: currentTime,
        updatedAt: currentTime,
      },
      {
        id: '3',
        name: '口コミ・評価',
        description: '利用者の口コミと評価の表示',
        priority: 'recommended' as const,
        type: 'common' as const,
        seoWeight: 7,
        contentGuidelines: defaultGuidelines,
        createdAt: currentTime,
        updatedAt: currentTime,
      },
      {
        id: '4',
        name: 'アクセス情報',
        description: '店舗・クリニックへのアクセス方法',
        priority: 'required' as const,
        type: 'common' as const,
        seoWeight: 6,
        contentGuidelines: defaultGuidelines,
        createdAt: currentTime,
        updatedAt: currentTime,
      },
    ];

    // Add genre-specific items
    if (genre.includes('医療脱毛') || genre.includes('脱毛')) {
      baseItems.push(
        {
          id: '5',
          name: '脱毛機器・技術',
          description: '使用する脱毛機器の種類と特徴',
          priority: 'required' as const,
          type: 'genre_specific' as const,
          seoWeight: 8,
          contentGuidelines: { ...defaultGuidelines, keywordSuggestions: ['脱毛機器', 'レーザー', '技術'] },
          createdAt: currentTime,
          updatedAt: currentTime,
        },
        {
          id: '6',
          name: '部位別料金',
          description: '顔・VIO・全身など部位別の料金設定',
          priority: 'required' as const,
          type: 'genre_specific' as const,
          seoWeight: 9,
          contentGuidelines: { ...defaultGuidelines, keywordSuggestions: ['部位別', '料金', 'VIO'] },
          createdAt: currentTime,
          updatedAt: currentTime,
        },
        {
          id: '7',
          name: '痛み対策',
          description: '麻酔の種類と料金、痛み軽減方法',
          priority: 'recommended' as const,
          type: 'genre_specific' as const,
          seoWeight: 7,
          contentGuidelines: { ...defaultGuidelines, keywordSuggestions: ['痛み', '麻酔', '軽減'] },
          createdAt: currentTime,
          updatedAt: currentTime,
        },
      );
    }

    if (genre.includes('AGA') || genre.includes('薄毛')) {
      baseItems.push(
        {
          id: '8',
          name: '治療方法',
          description: '投薬治療、注入治療、自毛植毛等の治療選択肢',
          priority: 'required' as const,
          type: 'genre_specific' as const,
          seoWeight: 9,
          contentGuidelines: { ...defaultGuidelines, keywordSuggestions: ['治療方法', '投薬', '植毛'] },
          createdAt: currentTime,
          updatedAt: currentTime,
        },
        {
          id: '9',
          name: '薬剤種類',
          description: 'フィナステリド、ミノキシジル等の薬剤詳細',
          priority: 'required' as const,
          type: 'genre_specific' as const,
          seoWeight: 8,
          contentGuidelines: { ...defaultGuidelines, keywordSuggestions: ['フィナステリド', 'ミノキシジル', '薬剤'] },
          createdAt: currentTime,
          updatedAt: currentTime,
        },
        {
          id: '10',
          name: '副作用情報',
          description: '治療に伴う副作用とリスク説明',
          priority: 'required' as const,
          type: 'compliance' as const,
          seoWeight: 6,
          contentGuidelines: { ...defaultGuidelines, keywordSuggestions: ['副作用', 'リスク', '注意'] },
          createdAt: currentTime,
          updatedAt: currentTime,
        },
      );
    }

    if (config.includeCompliance) {
      baseItems.push({
        id: '11',
        name: '法的表示',
        description: '薬機法・景品表示法に基づく必要な表示事項',
        priority: 'required' as const,
        type: 'compliance' as const,
        seoWeight: 5,
        contentGuidelines: { ...defaultGuidelines, keywordSuggestions: ['薬機法', '景品表示法', '法的'] },
        createdAt: currentTime,
        updatedAt: currentTime,
      });
    }

    return baseItems;
  };

  const handleExportHTML = () => {
    const selectedItemsData = state.generatedItems.filter(item => 
      state.selectedItems.includes(item.id)
    );
    
    let htmlContent = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ランキングサイト項目一覧</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; }
        .item { margin-bottom: 30px; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; }
        .item-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .priority { padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; }
        .required { background-color: #fef3c7; color: #92400e; }
        .recommended { background-color: #dbeafe; color: #1d4ed8; }
        .optional { background-color: #f3f4f6; color: #374151; }
    </style>
</head>
<body>
    <h1>ランキングサイト項目一覧</h1>
    <p>生成日時: ${new Date().toLocaleString('ja-JP')}</p>
    <p>選択項目数: ${selectedItemsData.length}件</p>
`;

    selectedItemsData.forEach(item => {
      htmlContent += `
    <div class="item">
        <div class="item-header">
            <h2>${item.name}</h2>
            <span class="priority ${item.priority}">${item.priority}</span>
        </div>
        <p>${item.description}</p>
    </div>`;
    });

    htmlContent += `
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ranking-items-${new Date().toISOString().slice(0, 10)}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportCSV = () => {
    const selectedItemsData = state.generatedItems.filter(item => 
      state.selectedItems.includes(item.id)
    );

    let csvContent = 'ID,項目名,説明,優先度,種別,SEO重要度\n';
    
    selectedItemsData.forEach(item => {
      const row = [
        item.id,
        `"${item.name}"`,
        `"${item.description}"`,
        item.priority,
        item.type,
        item.seoWeight || 0
      ].join(',');
      csvContent += row + '\n';
    });

    const bom = '\uFEFF'; // UTF-8 BOM for Excel compatibility
    const blob = new Blob([bom + csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ranking-items-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
        <Title>ランキングサイト項目生成</Title>
        <Description>
          ジャンルを入力するだけで、ランキングサイトに必要な項目を自動抽出します。
        </Description>
      </GeneratorHeader>

      {state.error && <ErrorMessage message={state.error} />}

      <GeneratorContent>
        <InputSection>
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
          
          <GenerateButton
            onClick={handleGenerateItems}
            disabled={state.loading || !genreInput.trim()}
          >
            {state.loading ? '抽出中...' : '項目を抽出'}
          </GenerateButton>
        </InputSection>

        {state.generatedItems.length > 0 && (
          <ResultsPanel>
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
            
            {state.selectedItems.length > 0 && (
              <ExportActions>
                <ExportButton onClick={handleExportHTML}>
                  HTML形式でエクスポート
                </ExportButton>
                <ExportButton $variant="secondary" onClick={handleExportCSV}>
                  CSV形式でエクスポート
                </ExportButton>
              </ExportActions>
            )}
          </ResultsPanel>
        )}
      </GeneratorContent>
    </GeneratorContainer>
  );
};

export default Generator;