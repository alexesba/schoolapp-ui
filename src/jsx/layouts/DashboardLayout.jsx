import { useContext, useEffect } from 'react';
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
import 'react-datepicker/dist/react-datepicker.css';

import useSessionActions from '../../store/actions/sessionActions';
import LockScreen from '../pages/LockScreen';
import currentUserAtom from '../../store/atoms/currentUserAtom';
import useAuthActions from '../../store/actions/authActions';

function DashboardLayout() {
  const { sidebariconHover } = useContext(ThemeContext);
  const sideMenu = useRecoilValue(toggleMenuAtom);
  const currentUser = useRecoilValue(currentUserAtom);
  const windowsize = window.innerWidth;
  const { loadCurrentUserBytoken } = useAuthActions();
  const { isLoggedIn } = useSessionActions();

  if (!isLoggedIn()) return <Navigate to={LOGIN_PATH} />;

  loadCurrentUserBytoken();

  if (!currentUser) return null;

  return (
    <div id="main-wrapper" className={` show  ${sidebariconHover ? 'iconhover-toggle' : ''} ${sideMenu ? 'menu-toggle' : ''}`}>
      <div className={`wallet-open  ${windowsize > 1920 ? 'active' : ''}`}>
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
  );
}

export default DashboardLayout;
