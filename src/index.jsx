import React, { StrictMode, Suspense } from "react";

import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { RecoilRoot, useRecoilValue } from "recoil";
import Error404 from './pages/Error404';
import LoginPage from './pages/Login';

/// Style
import './other/swiper/css/swiper-bundle.min.css';
import "./other/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./css/style.css";
import authAtom from "./store/atoms/authAtom";
import { LOGIN_PATH } from "./constants/app";
import { isEmpty } from "lodash";

const DashboardLayout = () => {
  const auth = useRecoilValue(authAtom)

  const isLoggedIn = !isEmpty(auth);
  return (isLoggedIn ?
    <div>
      DasboardLayout
      <Outlet />
    </div> : <Navigate to={LOGIN_PATH} />
  )
}

const root = createRoot(document.getElementById('app'));
root.render(
  <StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <Suspense fallback={
          <div id="preloader">
            <div className="sk-three-bounce">
              <div className="sk-child sk-bounce1"></div>
              <div className="sk-child sk-bounce2"></div>
              <div className="sk-child sk-bounce3"></div>
            </div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<DashboardLayout />}>
              <Route path="users" element={<div>User List </div>} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </RecoilRoot>
  </StrictMode >,
);
