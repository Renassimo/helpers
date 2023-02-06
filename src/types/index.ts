import { NextApiRequest } from 'next';

export interface User {
  email: string;
  name: string;
  picture: string;
  uid: string;
}

export type Data = {
  name: string;
};

export interface NextApiRequestWithAuth extends NextApiRequest {
  uid?: string;
}
