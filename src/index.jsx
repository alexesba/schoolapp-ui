import React, { StrictMode, Suspense, useContext } from "react";

import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { RecoilRoot, useRecoilValue } from "recoil";
import Error404 from './jsx/pages/Error404';
import LoginPage from './jsx/pages/Login';
import WalletBar from './jsx/layouts/WalletBar';
import Footer from './jsx/layouts/Footer';
import Nav2 from './jsx/layouts/nav/index2';

/// Style
import './other/swiper/css/swiper-bundle.min.css';
import "./other/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./css/style.css";
import './jsx/index.css'
import './jsx/step.css'
import './jsx/chart.css'

import authAtom from "./store/atoms/authAtom";
import { LOGIN_PATH } from "./constants/app";
import { isEmpty } from "lodash";
import ThemeContextProvider, { ThemeContext } from "./context/ThemeContext";
import toggleMenuAtom from "./store/atoms/toggleMenuAtom";

const DashboardLayout = () => {
  const auth = useRecoilValue(authAtom)
  const { sidebariconHover } = useContext(ThemeContext)
  const sideMenu = useRecoilValue(toggleMenuAtom);
  console.log('sideMenu', sideMenu);
  let windowsize = window.innerWidth;


  const isLoggedIn = !isEmpty(auth);
  return (isLoggedIn ?
    (
      <div id="main-wrapper" className={` show  ${sidebariconHover ? "iconhover-toggle" : ""} ${sideMenu ? "menu-toggle" : ""}`}>
        <div className={`wallet-open  ${windowsize > 1199 ? 'active' : ''}`}>
          <Nav2 />
          <div className="content-body" style={{ minHeight: window.screen.height + 20 }}>
            <div className="container-fluid">
              <Outlet />
            </div>
          </div>
          <Footer changeFooter="footer-outer" />
          <WalletBar />
        </div>
      </div>
    ) : <Navigate to={LOGIN_PATH} />
  )
}

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
