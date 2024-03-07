import { useRecoilState } from 'recoil';
import axios from 'axios';
import { pick } from 'lodash';
import { useNavigate } from 'react-router-dom';
import AuthAtom from '../store/atoms/authAtom';
import { local } from '../store/localStorage';
import { APP_TOKEN_NAME } from '../constants/session';

const getAuthHeaders = (response) => pick(
  response.headers,
  ['access-token', 'client', 'expiry', 'uid', 'token-type'],
);

const useAxiosWrapper = () => {
  const api = axios.create({
    baseURL: process.env.API_BASE_URL,
  });
  const [headers, setAuth] = useRecoilState(AuthAtom);

  const navigate = useNavigate();

  const successResponse = (response) => {
    const authHeaders = getAuthHeaders(response);
    if (authHeaders['access-token']) {
      setAuth(authHeaders);
      local.setItem(APP_TOKEN_NAME, JSON.stringify(authHeaders));
    }
    return response;
  };

  const errorResponse = (error) => {
    const status = error?.request?.status;
    if (status && status === 401) {
      local.removeItem(APP_TOKEN_NAME);
      setAuth(null);
      return navigate('/login');
    }
    return error;
  };

  const setRequestHeaders = (config) => {
    // eslint-disable-next-line no-param-reassign
    config.headers = headers;
    return config;
  };

  // Refresh the token on each request
  api.interceptors.response.use(
    successResponse,
    errorResponse,
  );

  // Set the header tokens on each request
  api.interceptors.request.use(setRequestHeaders);

  return api;
};

export default useAxiosWrapper;
