import { configureStore } from "@reduxjs/toolkit";
import AdminDashboard from "./admin-dash";
const createStore = configureStore({
  reducer: {
    admin: AdminDashboard,
  },
});

export default createStore;
