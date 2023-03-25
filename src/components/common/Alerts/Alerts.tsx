import styled from '@emotion/styled';
import MUIAlert from '@mui/material/Alert';
import { Alert } from '@/types/alerts';

const AlertsContainer = styled.div`
  position: absolute;
  top: 7vh;
  right: 2vw;
  display: grid;
  grid-gap: 16px;
  width: 300px;
`;

const Alerts = ({
  alerts,
  removeAlert,
}: {
  alerts: Alert[];
  removeAlert: (id: number) => void;
}) => (
  <AlertsContainer>
    {alerts.map((alert) => (
      <MUIAlert
        key={alert.id}
        severity={alert.severity}
        onClose={() => removeAlert(alert.id)}
      >
        <div>{alert.text}</div>
      </MUIAlert>
    ))}
  </AlertsContainer>
);

export default Alerts;
