import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// image
import BgImage from '../../images/bg1.png';
import logo from '../../images/logo-full.png';
import logolight from '../../images/logo-white.png';
import pol from '../../images/pol.jpg';
import useAuthActions from '../../store/actions/authActions';
import { HOME_PATH } from '../../constants/app';
import useSessionActions from '../../store/actions/sessionActions';

function Login({ successMessage, errorMessage }) {
  const [email, setEmail] = useState('');
  const errorsObj = { email: '', password: '' };
  const [errors, setErrors] = useState(errorsObj);
  const [password, setPassword] = useState('');
  const { loginAction } = useAuthActions();
  const navigate = useNavigate();
  const { isLoggedIn } = useSessionActions();

  const onLogin = (e) => {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (email === '') {
      errorObj.email = 'Email is Required';
      error = true;
    }
    if (password === '') {
      errorObj.password = 'Password is Required';
      error = true;
    }
    setErrors(errorObj);
    if (error) {
      return;
    }

    loginAction({ email, password });
  };

  const element = document.querySelector('body');
  const dataTheme = element.getAttribute('data-theme-version');

  useEffect(() => {
    if (isLoggedIn()) {
      navigate(HOME_PATH, { replace: true });
    }
  }, []);

  return (
    <div className="container h-100">
      <div className="row h-100 align-items-center justify-contain-center">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-body p-0">
              <div className="row m-0">
                <div className="col-xl-6 col-md-6 sign text-center sign-bg" style={{ backgroundImage: `url(${pol})` }}>
                  <div>
                    <div className="text-center my-5">
                      <Link to="/#">
                        <img className="logo-abbr dark-logo" width="200" src={logo} alt="" />
                        <img className="logo-abbr light-logo text-center m-auto" width="200" src={logolight} alt="" />
                      </Link>
                    </div>
                    {
                      dataTheme === 'light'
                        ? <img src={BgImage} alt="" className="slideskew img-fix bitcoin-img" />
                        : <img src={BgImage} alt="" className=" slideskew img-fix bitcoin-img " />
                    }
                  </div>
                </div>
                <div className="col-xl-6 col-md-6">
                  <div className="sign-in-your px-2">
                    <h4 className="fs-20 ">Sign in your account</h4>
                    <span>
                      Welcome back! Login with your data that you entered during registration
                    </span>
                    <div className="login-social">
                      <Link to="/#" className="btn btn-primary  d-block my-3">
                        <i className="fab fa-google me-2" />
                        Login with Google
                      </Link>
                      <Link to="/#" className="btn btn-secondary  d-block my-3">
                        <i className="fab fa-facebook-f me-2 facebook-log" />
                        Login with Facebook
                      </Link>
                    </div>
                    {errorMessage && (
                      <div className="bg-red-300 text-red-900 border border-red-900 p-1 my-2">
                        {errorMessage}
                      </div>
                    )}
                    {successMessage && (
                      <div className="bg-green-300 text-green-900 border border-green-900 p-1 my-2">
                        {successMessage}
                      </div>
                    )}
                    <form onSubmit={onLogin}>
                      <div className="mb-3">
                        <label className="mb-1"><strong>Email</strong></label>
                        <input
                          type="email"
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Type Your Email Address"
                        />

                        {errors.email && <div className="text-danger fs-12">{errors.email}</div>}
                      </div>
                      <div className="mb-3">
                        <label className="mb-1"><strong>Password</strong></label>
                        <input
                          type="password"
                          className="form-control"
                          value={password}
                          placeholder="Type Your Password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <div className="text-danger fs-12">{errors.password}</div>}
                      </div>
                      <div className="row d-flex justify-content-between mt-4 mb-2">
                        <div className="mb-3">
                          <div className="form-check custom-checkbox ms-1">
                            <input type="checkbox" className="form-check-input" id="basic_checkbox_1" />
                            <label className="form-check-label" htmlFor="basic_checkbox_1">Remember my preference</label>
                          </div>
                        </div>
                        <div className="mb-3">
                          <Link to="/page-register">Sign up</Link>
                        </div>
                      </div>
                      <div className="text-center">
                        <button type="submit" className="btn btn-primary btn-block">Sign Me In</button>
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

Login.propTypes = {
  successMessage: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

export default Login;
