import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import storage from "redux-persist/lib/storage"; // For using localStorage
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

// Step 1: Configure persist settings
const persistConfig = {
  key: "root", // This key represents the root of the persisted state
  storage,     // Use localStorage for persistence
};

// Step 2: Combine your reducers if you have more than one
const rootReducer = combineReducers({
  user: userSlice, // Persist the user reducer
});

// Step 3: Wrap your root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Step 4: Configure store with the persisted reducer, and disable serializableCheck
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      // Ignore the persist actions since they include non-serializable values
      ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
    },
  }),
});

// Step 5: Export persistor for use in the app
export const persistor = persistStore(store);