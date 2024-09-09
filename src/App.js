import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { locales } from './i18n/helper';
import { setDatasetsSuggestion, setPublishers, setStoriesTags, setSupportSuggestion, setTags, setTopics, setFileFormats } from './redux/reducers/Facets';
import { setAboutus } from './redux/reducers/About';
import { checkUser, getAboutUs, getAllApplications, getFacets, getFaqsCategory, getFileFormatsFacets, getIpAddress, getPopularQuestions, getSearch, getStoriesTags, getSuccessStories } from './axios/api';
import { setApplications } from './redux/reducers/Applications';
import { handleLogin, handleLogout } from './redux/reducers/Authentication';
import { setStories, toggleLoading } from './redux/reducers/SuccessStories';
import { setCategories, setQuestions } from './redux/reducers/Support';
import { useSelector } from 'react-redux';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import Router from './router';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { setPublisherSuggestion } from './redux/reducers/Publishers';
import { setIpAddress } from './redux/reducers/IpAddress';

function App() {

  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const storiesFilters = useSelector((state) => state.stories.filters);

  // Create rtl cache
  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });

  const emptyCache = createCache({
    key: "muiltr",
  });

  useEffect(() => {
    document.getElementsByTagName('html')[0].setAttribute("dir", i18n.language === locales.EN ? "ltr" : "rtl")
  }, [i18n.language])

  useEffect(() => {
    getFacets(i18n.language === locales.AR ? "themelear" : "theme", dispatch, setTopics);
    getIpAddress(dispatch, setIpAddress);
    checkUser(dispatch, handleLogin, handleLogout);
    getAboutUs(dispatch, setAboutus);
    getAllApplications(dispatch, setApplications);
    getFaqsCategory(dispatch, setCategories);
    getPopularQuestions(dispatch, setQuestions);
    getStoriesTags(dispatch, setStoriesTags);
    getSearch("dataset", dispatch, setDatasetsSuggestion)
    getSearch("support", dispatch, setSupportSuggestion)
    getSearch("publishers", dispatch, setPublisherSuggestion)
    getSuccessStories(dispatch, setStories, toggleLoading, storiesFilters);
  }, []);

  // if (process.env.REACT_APP_ENVIORNMENT !== 'dev') {
  //   console.log = () => { }
  //   console.error = () => { }
  //   console.warn = () => { }
  // }

  return (
    <CacheProvider value={i18n.language === locales.AR ? cacheRtl : emptyCache}>
      <div className={`${i18n.language === locales.AR && "ar-font"}`}>
        <Router />
        <ToastContainer />
      </div>
    </CacheProvider>
  )
}

export default App;
