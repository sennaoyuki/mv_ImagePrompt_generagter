import React, { Component, ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
  background-color: #f9fafb;
`;

const ErrorTitle = styled.h1`
  color: #dc2626;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  color: #6b7280;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  max-width: 600px;
`;

const RetryButton = styled.button`
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
  }
`;

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorTitle>アプリケーションエラーが発生しました</ErrorTitle>
          <ErrorMessage>
            予期しないエラーが発生しました。ページを再読み込みして再試行してください。
            {this.state.error && (
              <details style={{ marginTop: '1rem', textAlign: 'left' }}>
                <summary>エラー詳細</summary>
                <pre style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>
                  {this.state.error.message}
                </pre>
              </details>
            )}
          </ErrorMessage>
          <RetryButton onClick={this.handleRetry}>
            ページを再読み込み
          </RetryButton>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;