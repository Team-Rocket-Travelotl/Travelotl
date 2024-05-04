import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import tripReducer from "./reducers/tripReducer.ts";
import itineraryReducer from "./reducers/itineraryReducer.ts";
import storageSession from "redux-persist/lib/storage/session";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
// import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage: storageSession,
  // stateReconciler: hardSet,
};

const persistedReducer = persistReducer(persistConfig, itineraryReducer);

export const store = configureStore({
  reducer: {
    trip: tripReducer,
    itinerary: persistedReducer,
  },
  // middleware: [thunk],
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
