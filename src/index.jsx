import React, { StrictMode, Suspense } from 'react';
import RecoilizeDebugger from 'recoilize';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import LoaderSpinner from './jsx/components/LoaderSpinner/LoaderSpinner';
import ThemeContextProvider from './context/ThemeContext';

/// Style
import './other/swiper/css/swiper-bundle.min.css';
import './other/bootstrap-select/dist/css/bootstrap-select.min.css';
import 'spinkit/spinkit.min.css';
import './css/style.css';

const Error404 = React.lazy(() => import('./jsx/pages/Error404'));
const LoginPage = React.lazy(() => import('./jsx/pages/Login'));
const DashboardLayout = React.lazy(() => import('./jsx/layouts/DashboardLayout'));
const Students = React.lazy(() => import('./jsx/components/Student/Students'));
const StudentDetails = React.lazy(() => import('./jsx/components/Student/StudentDetails'));
const AddNewStudent = React.lazy(() => import('./jsx/components/Student/AddNewStudent'));
const Teachers = React.lazy(() => import('./jsx/components/Teacher/Teachers'));
const TeacherDetail = React.lazy(() => import('./jsx/components/Teacher/TeachersDetail'));
const AddNewTeacher = React.lazy(() => import('./jsx/components/Teacher/AddNewTeacher'));
const AppProfile = React.lazy(() => import('./jsx/components/AppsMenu/AppProfile/AppProfile'));
const EditProfile = React.lazy(() => import('./jsx/components/AppsMenu/AppProfile/EditProfile'));
const Finance = React.lazy(() => import('./jsx/components/Dashboard/Finance'));
const Home = React.lazy(() => import('./jsx/components/Dashboard/Home'));
const app = document.getElementById('root');
const root = createRoot(app);
root.render(
  <StrictMode>
    <RecoilRoot>
      <RecoilizeDebugger root={app} />
      <BrowserRouter>
        <ThemeContextProvider>
          <Suspense fallback={<LoaderSpinner />}>
            <Routes>
              <Route element={<DashboardLayout />}>
                <Route path="/" exact element={<Home />} />
                <Route path="/dashboard" exact element={<Home />} />
                <Route path="students" element={<Students />} />
                <Route path="students/:id/edit" element={<EditProfile />} />
                <Route path="students/:id/show" element={<StudentDetails />} />
                <Route path="parents/:id" element={<StudentDetails />} />
                <Route path="student-detail" element={<StudentDetails />} />
                <Route path="add-student" element={<AddNewStudent />} />
                <Route path="teachers" element={<Teachers />} />
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
  </StrictMode>,
);
