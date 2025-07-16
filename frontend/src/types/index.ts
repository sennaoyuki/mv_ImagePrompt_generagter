export type Priority = 'required' | 'recommended' | 'optional';
export type GenreCategory = 'medical' | 'beauty' | 'fitness' | 'general';
export type Law = '薬機法' | '景品表示法' | '個人情報保護法';
export type ItemType = 'common' | 'genre_specific' | 'region_specific' | 'compliance';
export type TemplateType = 'html' | 'text' | 'structured';

export interface ContentGuidelines {
  recommendedLength: number;
  keywordSuggestions: string[];
  avoidExpressions: string[];
}

export interface Item {
  id: string;
  name: string;
  description: string;
  priority: Priority;
  seoWeight: number;
  contentGuidelines: ContentGuidelines;
  type: ItemType;
  createdAt: string;
  updatedAt: string;
}

export interface CommonItem extends Item {
  type: 'common';
}

export interface GenreSpecificItem extends Item {
  type: 'genre_specific';
  genreId: string;
}

export interface RegionSpecificItem extends Item {
  type: 'region_specific';
  regionId: string;
}

export interface ComplianceItem extends Item {
  type: 'compliance';
  complianceRuleId: string;
}

export interface Genre {
  id: string;
  name: string;
  category: GenreCategory;
  seoKeywords: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Region {
  id: string;
  name: string;
  prefecture: string;
  areaCode: string;
  createdAt: string;
  updatedAt: string;
}

export interface ComplianceRule {
  id: string;
  law: Law;
  description: string;
  requiredItems: string[];
  prohibitedExpressions: string[];
  requiredDisclosures: string[];
  applicableGenres: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ContentTemplate {
  id: string;
  itemId: string;
  itemType: ItemType;
  templateType: TemplateType;
  content: string;
  variables: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface ContentExample {
  id: string;
  templateId: string;
  title: string;
  content: string;
  recommendedLength: number;
  keywordSuggestions: string[];
  createdAt: string;
  updatedAt: string;
}

export interface UserCustomization {
  id: string;
  userId: string;
  projectName: string;
  selectedGenres: string[];
  selectedRegions: string[];
  selectedItems: Record<string, any>;
  customItems: Record<string, any>;
  settings: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface GenerateRequest {
  genres: string[];
  region?: string;
  seoOptimized: boolean;
  includeCompliance: boolean;
}

export interface GenerateResponse {
  commonItems: CommonItem[];
  genreSpecificItems: GenreSpecificItem[];
  regionSpecificItems: RegionSpecificItem[];
  complianceItems: ComplianceItem[];
  metadata: {
    totalCount: number;
    priorityDistribution: Record<Priority, number>;
  };
}

export interface TemplateResponse {
  htmlTemplate: string;
  cssTemplate: string;
  structuredData: object;
  contentExamples: ContentExample[];
  seoGuidelines: SEOGuideline[];
}

export interface SEOGuideline {
  title: string;
  description: string;
  importance: Priority;
  implementation: string;
}

export interface SaveCustomizationRequest {
  userId: string;
  projectName: string;
  selectedItems: string[];
  customItems: CustomItem[];
  settings: ProjectSettings;
}

export interface CustomItem {
  id: string;
  name: string;
  description: string;
  priority: Priority;
  category: string;
}

export interface ProjectSettings {
  seoOptimized: boolean;
  includeCompliance: boolean;
  preferredFormats: string[];
  customFields: Record<string, any>;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AppState {
  genres: Genre[];
  regions: Region[];
  selectedGenres: string[];
  selectedRegions: string[];
  generatedItems: Item[];
  selectedItems: string[];
  customItems: CustomItem[];
  loading: boolean;
  error: string | null;
}

export interface AppContextType {
  state: AppState;
  actions: {
    setGenres: (genres: Genre[]) => void;
    setRegions: (regions: Region[]) => void;
    setSelectedGenres: (genres: string[]) => void;
    setSelectedRegions: (regions: string[]) => void;
    setGeneratedItems: (items: Item[]) => void;
    setSelectedItems: (items: string[]) => void;
    setCustomItems: (items: CustomItem[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    resetState: () => void;
  };
}