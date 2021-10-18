import React from 'react';
import ReactDOM from 'react-dom';
import App from './layout/App';
import { BrowserRouter as Router } from 'react-router-dom';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './layout/theme';
import SearchProvider from './context/SearchContext';
import RecipeProvider from './context/RecipeContext';
import reportWebVitals from './reportWebVitals';
import './layout/App.scss';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ScopedCssBaseline className="baseline">
        <Router>
          <RecipeProvider>
            <SearchProvider>
              <App />
            </SearchProvider>
          </RecipeProvider>
        </Router>
      </ScopedCssBaseline>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
