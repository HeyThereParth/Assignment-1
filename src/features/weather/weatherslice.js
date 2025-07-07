import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Could not find the city. Try again.");
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    current: {},
    hourly: [],
    daily: [],
    loading: false,
    error: null,
    isCelsius: true,
    searchTerm: "",
  },
  reducers: {
    toggleUnit: (state) => {
      state.isCelsius = !state.isCelsius;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        const data = action.payload;
        state.loading = false;
        state.searchTerm = data.location.name;

        state.current = {
          temperature: Math.floor(data.current.temp_c),
          description: data.current.condition.text,
          icon: data.current.condition.icon.replace("64x64", "128x128"),
        };

        const now = new Date().setMinutes(0, 0, 0);
        const next24 = now + 24 * 60 * 60 * 1000;

        const combined = [
          ...data.forecast.forecastday[0].hour,
          ...data.forecast.forecastday[1].hour,
        ];

        state.hourly = combined.filter(({ time }) => {
          const t = new Date(time).getTime();
          return t >= now && t <= next24;
        });

        state.daily = data.forecast.forecastday.map((d) => ({
          date: d.date,
          avgTemp: Math.round(d.day.avgtemp_c),
          minTemp: Math.round(d.day.mintemp_c),
          maxTemp: Math.round(d.day.maxtemp_c),
          icon: d.day.condition.icon.replace("64x64", "128x128"),
          description: d.day.condition.text,
        }));
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { toggleUnit, setSearchTerm } = weatherSlice.actions;

export default weatherSlice.reducer;
