import { AlertColor } from '@mui/material';
import { ReactNode } from 'react';

export interface Alert {
  id: number;
  text: string | number | ReactNode;
  severity: AlertColor;
}

export type RemoveSpecificAlertFunction = (
  text: string | number | ReactNode,
  lifetime?: number
) => void;
