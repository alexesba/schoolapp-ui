import React, { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter, Route, Routes, Outlet,
} from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import LoaderSpinner from './jsx/components/LoaderSpinner/LoaderSpinner';
import ThemeContextProvider from './context/ThemeContext';

/// Style
import './other/swiper/css/swiper-bundle.min.css';
import './other/bootstrap-select/dist/css/bootstrap-select.min.css';
import 'spinkit/spinkit.min.css';
import './css/style.css';
import ParentIndex from './jsx/pages/Parents';

const Error404 = React.lazy(() => import('./jsx/pages/Error404'));
const LoginPage = React.lazy(() => import('./jsx/pages/Login'));
const DashboardLayout = React.lazy(() => import('./jsx/layouts/DashboardLayout'));
const StudentsIndex = React.lazy(() => import('./jsx/pages/Students'));
const StudentDetails = React.lazy(() => import('./jsx/pages/Students/ShowStudent'));
const EditStudent = React.lazy(() => import('./jsx/pages/Students/EditStudent'));
const AddNewStudent = React.lazy(() => import('./jsx/pages/Students/NewStudent'));
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
      <BrowserRouter>
        <ThemeContextProvider>
          <Suspense fallback={<LoaderSpinner />}>
            <Routes>
              <Route path="/" element={<DashboardLayout />}>
                <Route index element={<Home />} />
                <Route path="/dashboard" exact element={<Home />} />
                <Route path="students" element={<Outlet />}>
                  <Route index element={<StudentsIndex />} />
                  <Route path="new" element={<AddNewStudent />} />
                  <Route path=":id/edit" element={<EditStudent />} />
                  <Route path=":id" element={<StudentDetails />} />
                </Route>
                <Route path="parents" element={<Outlet />}>
                  <Route index element={<ParentIndex />} />
                  <Route path=":id" element={<StudentDetails />} />
                </Route>
                <Route path="teachers" element={<Outlet />}>
                  <Route index element={<Teachers />} />
                  <Route path=":id" element={<TeacherDetail />} />
                  <Route path="new" element={<AddNewTeacher />} />
                </Route>
                {/* Remove the student-detail and teacher-detail routes */}
                <Route path="teacher-detail" element={<TeacherDetail />} />
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
