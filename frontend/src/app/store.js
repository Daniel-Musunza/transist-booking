import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/auth/authSlice'
import subjectReducer from '../features/subjects/subjectSlice'
import allsubjectReducer from '../features/subjects/allSubjectSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    subjects: subjectReducer,
    allsubjects: allsubjectReducer
  },
})
