import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "../features/blogSlice";
import trainingsSubcategoriesReducer from "../features/trainingssubcategoriesslice";
import trainingsReducer from "../features/trainingsSlice";
import accreditationsReducer from "../features/accreditationsSlice";
import feedbackReducer from "../features/feedbackSlice";
import partnersReducer from "../features/partnersSlice";
import MessagesReducer from "../features/MessagesSlice";
import slideReducer from "../features/slideSlice";
import customerCommentReducer from "../features/customerCommentSlice";
import engineerServicesSubCategoriesReducer from "../features/engineerServicesSubCategoriesSlice";
import engineerServicesReducer from "../features/engineerServicesSlice";
import certificatesReducer from "../features/certificatesSlice";
import equipmentsReducer from "../features/equipmentsSlice";
import equipmentsSubCategoriesReducer from "../features/equipmentsSubCategoriesSlice";
import educationEventsReducer from "../features/educationEventsSlice";
import settingsReducer from "../features/settingsSlice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    blogs: blogsReducer,
    trainingsSubcategories: trainingsSubcategoriesReducer,
    trainings: trainingsReducer,
    accreditations: accreditationsReducer,
    feedback: feedbackReducer,
    partners: partnersReducer,
    messages: MessagesReducer,
    slides: slideReducer,
    customerComment: customerCommentReducer,
    engineerServicesSubCategories: engineerServicesSubCategoriesReducer,
    engineerServices: engineerServicesReducer,
    certificates: certificatesReducer,
    equipments: equipmentsReducer,
    equipmentsSubCategories: equipmentsSubCategoriesReducer,
    educationEvents: educationEventsReducer,
    settings: settingsReducer,
  },
});
