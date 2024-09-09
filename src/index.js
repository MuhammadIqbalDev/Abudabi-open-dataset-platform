import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
// import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { Suspense, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import i18n from './i18n/i18n.js';
import { locales } from './i18n/helper';
import ScrollToTop from './router/ScrollToTop';
import App from './App';
import './index.css';
import './i18n/i18n.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

const THEME = createTheme({
  typography: {
    "fontFamily": `${i18n.language === locales.EN ? 'CircularAr-Regular' : 'CircularStd-Regular'}`
  }
});

root.render(
  <Router>
    <ScrollToTop />
    <Suspense>
      <ThemeProvider theme={THEME}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </Suspense>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
