import { AlertColor } from '@mui/material';

export interface Alert {
  id: number;
  text: string;
  severity: AlertColor;
}

export type RemoveSpecificAlertFunction = (
  text: string,
  lifetime?: number
) => void;
