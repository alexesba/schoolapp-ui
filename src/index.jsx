import React, { StrictMode, Suspense, useContext } from "react";

import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Error404 from './jsx/pages/Error404';
import LoginPage from './jsx/pages/Login';
import WalletBar from './jsx/layouts/WalletBar';
import Footer from './jsx/layouts/Footer';
import Nav2 from './jsx/layouts/nav/index2';
import DashboardLayout from "./jsx/layouts/DashboardLayout";
import ThemeContextProvider from "./context/ThemeContext";

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
        </ThemeContextProvider>
      </BrowserRouter>
    </RecoilRoot>
  </StrictMode >,
);
