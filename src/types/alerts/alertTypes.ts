import { AlertColor } from '@mui/material';

export interface Alert {
  id: number;
  text: string | number;
  severity: AlertColor;
}

export type RemoveSpecificAlertFunction = (
  text: string | number,
  lifetime?: number
) => void;
