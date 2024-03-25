import { useRecoilState } from 'recoil';
import alertContainerAtom from '../atoms/alertContainerAtom';

const alertDefaults = {
  show: true,
  message: '',
  type: '',
  dismissible: true,
  autoClose: 3000,
};

const buildAlert = (properties = {}) => (
  { ...alertDefaults, ...properties }
);

const useAlert = () => {
  const [, setAlert] = useRecoilState(alertContainerAtom);

  const createAlert = (message, type, dismissible = true) => setAlert(buildAlert({
    message,
    type,
    dismissible,
  }));

  return {
    success: (message) => createAlert(message, 'success'),
    info: (message) => createAlert(message, 'info'),
    warning: (message) => createAlert(message, 'warning'),
    error: (message) => createAlert(message, 'error'),
  };
};

export default useAlert;
