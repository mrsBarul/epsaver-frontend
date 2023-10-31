import storage from "redux-persist/lib/storage"; 

const authPersistConfig = {
    key:'user',
    storage,
    whitelist: ["userData"]
};

export { authPersistConfig };