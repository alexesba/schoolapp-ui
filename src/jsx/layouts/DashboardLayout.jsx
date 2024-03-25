import { useContext, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Footer from './Footer';
import Nav2 from './nav/index2';
import WalletBar from './WalletBar';
import { Alert, Col, Row } from "react-bootstrap";
import toggleMenuAtom from '../../store/atoms/toggleMenuAtom';
import { LOGIN_PATH } from '../../constants/app';
import { ThemeContext } from '../../context/ThemeContext';
import '../index.css';
import '../step.css';
import '../chart.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';

import useSessionActions from '../../store/actions/sessionActions';
import LockScreen from '../pages/LockScreen';
import currentUserAtom from '../../store/atoms/currentUserAtom';
import useAuthActions from '../../store/actions/authActions';
import lockScreenAtom from '../../store/atoms/lockScreenAtom';
import AlertsContainer from '../components/Notifications/AlertsContainer';
import { ToastContainer } from 'react-toastify';


function DashboardLayout() {
  const { sidebariconHover } = useContext(ThemeContext);
  const sideMenu = useRecoilValue(toggleMenuAtom);
  const lockScreen = useRecoilValue(lockScreenAtom);
  const currentUser = useRecoilValue(currentUserAtom);
  const windowsize = window.innerWidth;
  const { loadCurrentUserBytoken } = useAuthActions();
  const { isLoggedIn } = useSessionActions();
  loadCurrentUserBytoken();

  if (!isLoggedIn()) return <Navigate to={LOGIN_PATH} />;

  if (lockScreen) return <LockScreen />;

  if (!currentUser) return <div />;

  return (
    <div id="main-wrapper" className={` show  ${sidebariconHover ? 'iconhover-toggle' : ''} ${sideMenu ? 'menu-toggle' : ''}`}>
      <div className={`wallet-open  ${windowsize > 1920 ? 'active' : ''}`}>
        <Nav2 />
        <div className="content-body" style={{ minHeight: window.screen.height + 20 }}>
          <div className="container-fluid">
            <AlertsContainer />
            <ToastContainer />
            <Outlet />
          </div>
        </div>
        <Footer changeFooter="footer out-footer style-2" />
        <WalletBar />
      </div>
    </div>
  );
}

export default DashboardLayout;
