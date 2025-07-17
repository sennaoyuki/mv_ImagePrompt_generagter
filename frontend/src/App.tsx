import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { AppProvider } from './context/AppContext';
import { theme } from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';
import Layout from './components/Layout/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import Generator from './pages/Generator';
import Templates from './pages/Templates';
import Customizations from './pages/Customizations';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <AppProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/generator" element={<Generator />} />
                <Route path="/templates" element={<Templates />} />
                <Route path="/customizations" element={<Customizations />} />
              </Routes>
            </Layout>
          </Router>
        </AppProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;