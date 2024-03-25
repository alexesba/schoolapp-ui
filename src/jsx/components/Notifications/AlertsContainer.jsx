import { Alert, Col, Row } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { capitalize } from 'lodash';
import alertContainerAtom from '../../../store/atoms/alertContainerAtom';

const icon = {
  success: (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      fillRule="round"
      className="me-2"
    >
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  ),

  info: (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      fillRule="round"
      className="me-2"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),

  warning: (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      fillRule="round"
      className="me-2"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),

  error: (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      fillRule="round"
      className="me-2"
    >
      <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
};

function AlertsContainer() {
  const [state, updateShow] = useRecoilState(alertContainerAtom);

  const closeAlert = () => updateShow({
    show: false,
  });

  useEffect(() => {
    if (state.autoClose && state.show) {
      setTimeout(closeAlert, state.autoClose);
    }
  }, [state]);

  return (
    <Row>
      <Col lg="12">
        <Alert
          variant={state.type}
          dismissible={state.dismissible}
          show={state.show}
        >
          {icon[state.type]}
          <strong>
            {capitalize(state.type)}
            !
            {' '}
          </strong>
          {' '}
          {state.message}
          {state.dismissible && (
          <button className="btn-close" onClick={closeAlert}>
            <span>
              <i className="fa-solid fa-xmark" />
            </span>
          </button>
          )}
        </Alert>
      </Col>
    </Row>
  );
}

export default AlertsContainer;
