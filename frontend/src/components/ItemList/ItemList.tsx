import React, { useState } from 'react';
import styled from 'styled-components';
import { Item, Priority, CustomItem } from '../../types';

interface ItemListProps {
  items: Item[];
  selectedItems: string[];
  onItemToggle: (itemId: string) => void;
  onCustomItemAdd: (item: CustomItem) => void;
}

const ItemListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const ItemListHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ItemListTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text};
`;

const ItemCount = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-left: ${({ theme }) => theme.spacing.sm};
`;

const FilterTabs = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const FilterTab = styled.button<{ $active: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme, $active }) => 
    $active ? theme.colors.primary : theme.colors.background};
  color: ${({ theme, $active }) => 
    $active ? 'white' : theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme, $active }) => 
      $active ? theme.colors.primaryHover : theme.colors.backgroundSecondary};
  }
`;

const ItemGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  max-height: 500px;
  overflow-y: auto;
`;

const ItemCard = styled.div<{ $selected: boolean }>`
  border: 1px solid ${({ theme, $selected }) => 
    $selected ? theme.colors.primary : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme, $selected }) => 
    $selected ? '#f0f7ff' : theme.colors.background};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ItemTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  flex: 1;
`;

const ItemBadges = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  flex-wrap: wrap;
`;

const PriorityBadge = styled.span<{ $priority: Priority }>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  background-color: ${({ theme, $priority }) => {
    switch ($priority) {
      case 'required': return '#fef3c7';
      case 'recommended': return '#dbeafe';
      case 'optional': return '#f3f4f6';
      default: return '#f3f4f6';
    }
  }};
  color: ${({ theme, $priority }) => {
    switch ($priority) {
      case 'required': return '#92400e';
      case 'recommended': return '#1d4ed8';
      case 'optional': return '#374151';
      default: return '#374151';
    }
  }};
`;

const TypeBadge = styled.span<{ $type: string }>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  background-color: ${({ theme, $type }) => {
    switch ($type) {
      case 'common': return '#e5e7eb';
      case 'genre_specific': return '#f3e8ff';
      case 'region_specific': return '#dcfce7';
      case 'compliance': return '#fef3c7';
      default: return '#e5e7eb';
    }
  }};
  color: ${({ theme, $type }) => {
    switch ($type) {
      case 'common': return '#374151';
      case 'genre_specific': return '#7c3aed';
      case 'region_specific': return '#166534';
      case 'compliance': return '#92400e';
      default: return '#374151';
    }
  }};
`;

const ItemDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
`;

const ItemList: React.FC<ItemListProps> = ({
  items,
  selectedItems,
  onItemToggle,
  onCustomItemAdd,
}) => {
  const [filter, setFilter] = useState<'all' | Priority>('all');

  const filteredItems = filter === 'all' 
    ? items 
    : items.filter(item => item.priority === filter);

  const getFilterLabel = (filterType: 'all' | Priority) => {
    switch (filterType) {
      case 'all': return 'すべて';
      case 'required': return '必須';
      case 'recommended': return '推奨';
      case 'optional': return '任意';
      default: return '';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'common': return '共通';
      case 'genre_specific': return 'ジャンル特化';
      case 'region_specific': return '地域特化';
      case 'compliance': return 'コンプライアンス';
      default: return type;
    }
  };

  return (
    <ItemListContainer>
      <ItemListHeader>
        <div>
          <ItemListTitle>
            生成された項目
            <ItemCount>（{filteredItems.length}件）</ItemCount>
          </ItemListTitle>
        </div>
      </ItemListHeader>

      <FilterTabs>
        {(['all', 'required', 'recommended', 'optional'] as const).map((filterType) => (
          <FilterTab
            key={filterType}
            $active={filter === filterType}
            onClick={() => setFilter(filterType)}
          >
            {getFilterLabel(filterType)}
          </FilterTab>
        ))}
      </FilterTabs>

      <ItemGrid>
        {filteredItems.map((item) => (
          <ItemCard
            key={item.id}
            $selected={selectedItems.includes(item.id)}
            onClick={() => onItemToggle(item.id)}
          >
            <ItemHeader>
              <ItemTitle>{item.name}</ItemTitle>
              <ItemBadges>
                <PriorityBadge $priority={item.priority}>
                  {getFilterLabel(item.priority)}
                </PriorityBadge>
                <TypeBadge $type={item.type}>
                  {getTypeLabel(item.type)}
                </TypeBadge>
              </ItemBadges>
            </ItemHeader>
            <ItemDescription>{item.description}</ItemDescription>
          </ItemCard>
        ))}
      </ItemGrid>

      {filteredItems.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem', 
          color: '#94a3b8' 
        }}>
          該当する項目がありません
        </div>
      )}
    </ItemListContainer>
  );
};

export default ItemList;