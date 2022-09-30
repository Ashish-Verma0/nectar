import { createSlice } from "@reduxjs/toolkit";

const adminStore = createSlice({
  name: "admin",
  initialState: {
    name: "",
    photo: "",
    email: "",
    designation: "",
    dashboard: false,
    analysis: false,
    users: false,
    plans: false,
    notifications: false,
    userActivity: false,
    userApproval: false,
    userPermission: false,
    blog: false,
    adminProfile: false,
  },
  reducers: {
    adminDashboard(state, action) {
      state.name = action.payload.name;
      state.photo = action.payload.photo;
      state.designation = action.payload.designation;
      state.dashboard = action.payload.dashboard;
      state.analysis = action.payload.analysis;
      state.users = action.payload.users;
      state.plans = action.payload.plans;
      state.notifications = action.payload.notifications;
      state.userActivity = action.payload.userActivity;
      state.userApproval = action.payload.userApproval;
      state.userPermission = action.payload.userPermission;
      state.blog = action.payload.blog;
      state.adminProfile = action.payload.adminProfile;
    },
  },
});

export const AuthAdminActions = adminStore.actions;
export default adminStore.reducer;
