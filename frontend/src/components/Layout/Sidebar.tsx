import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.nav`
  width: 250px;
  background-color: ${({ theme }) => theme.colors.background};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
`;

const Logo = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding-bottom: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const LogoText = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
`;

const NavigationList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const NavigationItem = styled.li<{ $active: boolean }>`
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme, $active }) => 
    $active ? theme.colors.primary : 'transparent'};
  
  &:hover {
    background-color: ${({ theme, $active }) => 
      $active ? theme.colors.primaryHover : theme.colors.backgroundSecondary};
  }
`;

const NavigationLink = styled(Link)<{ $active: boolean }>`
  display: block;
  padding: ${({ theme }) => theme.spacing.md};
  color: ${({ theme, $active }) => 
    $active ? 'white' : theme.colors.text};
  text-decoration: none;
  font-weight: ${({ theme, $active }) => 
    $active ? theme.typography.fontWeights.medium : theme.typography.fontWeights.normal};
  transition: all 0.2s ease;
`;

const navigationItems = [
  { path: '/', label: 'ホーム', icon: '🏠' },
  { path: '/generator', label: '項目生成', icon: '⚙️' },
  { path: '/templates', label: 'テンプレート', icon: '📝' },
  { path: '/customizations', label: 'カスタマイズ', icon: '🎨' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <SidebarContainer>
      <Logo>
        <LogoText>ランキング項目生成</LogoText>
      </Logo>
      
      <NavigationList>
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavigationItem key={item.path} $active={isActive}>
              <NavigationLink to={item.path} $active={isActive}>
                <span style={{ marginRight: '8px' }}>{item.icon}</span>
                {item.label}
              </NavigationLink>
            </NavigationItem>
          );
        })}
      </NavigationList>
    </SidebarContainer>
  );
};

export default Sidebar;