import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../features/weather/weatherslice";

const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});

export default store;
