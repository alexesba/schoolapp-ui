import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
// image
import logo from '../../images/logo-full.png';
import logolight from '../../images/logo-white.png';
import { useRecoilValue } from 'recoil';
import currentUserAtom from '../../store/atoms/currentUserAtom';
import useAuthActions from '../../store/actions/authActions';

function LockScreen() {
  const currentUser = useRecoilValue(currentUserAtom);
  const { unlockScreenAction } = useAuthActions()
  const pswdRef = useRef(null)

  const submitHandler = (e) => {
    e.preventDefault();
    const { current: { value: password } } = pswdRef;
    unlockScreenAction({ email: currentUser.email, password });
  };
  return (
    <div className="authincation h-100 ">
      <div className="container vh-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <div className="text-center mb-3">
                      <Link to="/dashboard">
                        <img className="logo-abbr dark-logo" width="200" src={logo} alt="" />
                        <img className="logo-abbr light-logo text-center m-auto" width="200" src={logolight} alt="" />
                      </Link>
                    </div>
                    <h4 className="text-center mb-4 ">Account Locked</h4>
                    <form onSubmit={submitHandler}>
                      <div className="form-group mb-3">
                        <label className="">
                          <strong>Password</strong>
                        </label>
                        <input
                          ref={pswdRef}
                          type="password"
                          className="form-control"
                          placeholder="********"
                        />
                      </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
                          Unlock
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LockScreen;
