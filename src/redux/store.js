import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import facetsReducer from './reducers/Facets';
import aboutReducer from './reducers/About';
import applicationReducer from './reducers/Applications';
import successStoriesReducer from './reducers/SuccessStories';
import supportReducer from './reducers/Support';
import publisherReducer from './reducers/Publishers';
import registerReducer from './reducers/Register';
import authenticationReducer from './reducers/Authentication';
import ipAddressReducer from './reducers/IpAddress';
import navbarReducer from './reducers/Navbar';

const persistConfig = {
    key: 'root',
    storage,
}

export const store = configureStore({
    reducer: {
        facets: facetsReducer,
        about: aboutReducer,
        application: applicationReducer,
        stories: successStoriesReducer,
        support: supportReducer,
        publisher: publisherReducer,
        register: registerReducer,
        ip_address: ipAddressReducer,
        navbar: navbarReducer,
        authentication: persistReducer(persistConfig, authenticationReducer)
    }
});

export const persistor = persistStore(store);