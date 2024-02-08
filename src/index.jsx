import React, { StrictMode, Suspense, useContext } from "react";

import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Error404 from './jsx/pages/Error404';
import LoginPage from './jsx/pages/Login';
import DashboardLayout from "./jsx/layouts/DashboardLayout";
import ThemeContextProvider from "./context/ThemeContext";
import Students from "./jsx/components/Student/Students";
import StudentDetails from "./jsx/components/Student/StudentDetails";
import AddNewStudent from "./jsx/components/Student/AddNewStudent";
import Teachers from "./jsx/components/Teacher/Teachers";
import TeacherDetail from "./jsx/components/Teacher/TeachersDetail";
import AddNewTeacher from "./jsx/components/Teacher/AddNewTeacher";
import AppProfile from "./jsx/components/AppsMenu/AppProfile/AppProfile";
import EditProfile from "./jsx/components/AppsMenu/AppProfile/EditProfile";
import Finance from "./jsx/components/Dashboard/Finance";
import Home from "./jsx/components/Dashboard/Home";


/// Style
import './other/swiper/css/swiper-bundle.min.css';
import "./other/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./css/style.css";

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <ThemeContextProvider>
          <Suspense fallback={<LoaderSpinner />}>
            <Routes>
              <Route element={<DashboardLayout />}>
                <Route path="/" exact element={<Home />} />
                <Route path="/dashboard" exact element={<Home />} />
                <Route path="student" element={<Students />} />
                <Route path="student-detail" element={<StudentDetails />} />
                <Route path="add-student" element={<AddNewStudent />} />
                <Route path="teacher" element={<Teachers />} />
                <Route path="teacher-detail" element={<TeacherDetail />} />
                <Route path="add-teacher" element={<AddNewTeacher />} />
                <Route path="app-profile" element={<AppProfile />} />
                <Route path="edit-profile" element={<EditProfile />} />
                <Route path="finance" element={<Finance />} />
              </Route>
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<Error404 />} />
            </Routes>
          </Suspense>
        </ThemeContextProvider>
      </BrowserRouter>
    </RecoilRoot>
  </StrictMode >,
);
