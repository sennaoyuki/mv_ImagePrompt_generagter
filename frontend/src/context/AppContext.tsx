import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, AppContextType, Genre, Region, Item, CustomItem } from '../types';

const initialState: AppState = {
  genres: [],
  regions: [],
  selectedGenres: [],
  selectedRegions: [],
  generatedItems: [],
  selectedItems: [],
  customItems: [],
  loading: false,
  error: null,
};

type AppAction =
  | { type: 'SET_GENRES'; payload: Genre[] }
  | { type: 'SET_REGIONS'; payload: Region[] }
  | { type: 'SET_SELECTED_GENRES'; payload: string[] }
  | { type: 'SET_SELECTED_REGIONS'; payload: string[] }
  | { type: 'SET_GENERATED_ITEMS'; payload: Item[] }
  | { type: 'SET_SELECTED_ITEMS'; payload: string[] }
  | { type: 'SET_CUSTOM_ITEMS'; payload: CustomItem[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET_STATE' };

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_GENRES':
      return { ...state, genres: action.payload };
    case 'SET_REGIONS':
      return { ...state, regions: action.payload };
    case 'SET_SELECTED_GENRES':
      return { ...state, selectedGenres: action.payload };
    case 'SET_SELECTED_REGIONS':
      return { ...state, selectedRegions: action.payload };
    case 'SET_GENERATED_ITEMS':
      return { ...state, generatedItems: action.payload };
    case 'SET_SELECTED_ITEMS':
      return { ...state, selectedItems: action.payload };
    case 'SET_CUSTOM_ITEMS':
      return { ...state, customItems: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'RESET_STATE':
      return initialState;
    default:
      return state;
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const actions = {
    setGenres: (genres: Genre[]) => dispatch({ type: 'SET_GENRES', payload: genres }),
    setRegions: (regions: Region[]) => dispatch({ type: 'SET_REGIONS', payload: regions }),
    setSelectedGenres: (genres: string[]) => dispatch({ type: 'SET_SELECTED_GENRES', payload: genres }),
    setSelectedRegions: (regions: string[]) => dispatch({ type: 'SET_SELECTED_REGIONS', payload: regions }),
    setGeneratedItems: (items: Item[]) => dispatch({ type: 'SET_GENERATED_ITEMS', payload: items }),
    setSelectedItems: (items: string[]) => dispatch({ type: 'SET_SELECTED_ITEMS', payload: items }),
    setCustomItems: (items: CustomItem[]) => dispatch({ type: 'SET_CUSTOM_ITEMS', payload: items }),
    setLoading: (loading: boolean) => dispatch({ type: 'SET_LOADING', payload: loading }),
    setError: (error: string | null) => dispatch({ type: 'SET_ERROR', payload: error }),
    resetState: () => dispatch({ type: 'RESET_STATE' }),
  };

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Custom hooks for specific state management
export const useItemsState = () => {
  const { state } = useApp();
  return {
    generatedItems: state.generatedItems,
    selectedItems: state.selectedItems,
    customItems: state.customItems,
  };
};

export const useGenresState = () => {
  const { state } = useApp();
  return {
    genres: state.genres,
    selectedGenres: state.selectedGenres,
  };
};

export const useRegionsState = () => {
  const { state } = useApp();
  return {
    regions: state.regions,
    selectedRegions: state.selectedRegions,
  };
};