import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Footer from './Footer';
import Nav2 from './nav/index2';
import WalletBar from './WalletBar';
import toggleMenuAtom from '../../store/atoms/toggleMenuAtom';
import { LOGIN_PATH } from '../../constants/app';
import { ThemeContext } from '../../context/ThemeContext';
import '../index.css';
import '../step.css';
import '../chart.css';
import useSessionActions from '../../store/actions/sessionActions';
import LockScreen from '../pages/LockScreen';

function DashboardLayout() {
  const { sidebariconHover } = useContext(ThemeContext);
  const sideMenu = useRecoilValue(toggleMenuAtom);
  const windowsize = window.innerWidth;
  const { isLoggedIn } = useSessionActions();

  // console.log('isLoggedIn', isLoggedIn());
  // return <LockScreen />;

  return (isLoggedIn()
    ? (
      <div id="main-wrapper" className={` show  ${sidebariconHover ? 'iconhover-toggle' : ''} ${sideMenu ? 'menu-toggle' : ''}`}>
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
  );
}

export default DashboardLayout;
